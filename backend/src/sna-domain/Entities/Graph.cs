using sna_domain.Exceptions;

namespace sna_domain.Entities;

public class Graph : BaseEntity
{
    public Guid OwnerId {get; private set;}
    public ApplicationUser Owner {get; private set;}= default!;
    private readonly List<Node> _vertices = [];
    private readonly List<Edge> _edges = [];
    public DateTime CreatedOn { get; private set; } = DateTime.UtcNow;
    public DateTime LastUpdatedAt { get; private set; }
    public IReadOnlyCollection<Node> Nodes => _vertices.AsReadOnly();
    public IReadOnlyCollection<Edge> Edges => _edges.AsReadOnly();

    public int Order => _vertices.Count;
    public int Size => _edges.Count;
    public Graph(){}
    public Graph(ApplicationUser user)
    {
        Owner = user ?? throw new ArgumentNullException(nameof(user));
        OwnerId = user.Id;

    }
    public void Touch() => LastUpdatedAt = DateTime.UtcNow;

    public Node AddNode(string name, string? description = null)
    {
        if (_vertices.Any(n => n.Name == name))
            throw new DomainException($"Node '{name}' already exists.");

        var node = new Node(name, description!);
        _vertices.Add(node);

        return node;
    }
    public void AddEdge(Node a, Node b)
    {
        if (!_vertices.Contains(a) || !_vertices.Contains(b))
            throw new DomainException("Both nodes must belong to the same graph.");

        if (_edges.Any(e => e.Connects(a, b)))
            throw new DomainException("Edge already exists.");

        var edge = Edge.Create(a, b);

        _edges.Add(edge);
        a.AddEdge(edge);
        b.AddEdge(edge);

        Touch();
    }


    public bool ComputeDegreeCentrality()
    {
        if (Order < 2) return false;
        foreach (var node in _vertices)
        {
            int degree = node.Links;
            double normalized = Order > 1 ? (double)degree / (Order - 1) : 0;

            node.SetCentrality(degree, normalized);
        }
        return true;
    }
}

