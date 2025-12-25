using sna_domain.Exceptions;

namespace sna_domain.Entities;

public class Graph 
{
    //public Guid OwnerId {get; private set;}
    //public ApplicationUser Owner {get; private set;}= default!;
    public Guid Id {get;set;}
    private  List<Node> _vertices = [];
    private  List<Edge> _edges = [];
    public DateTime CreatedOn { get; private set; } = DateTime.UtcNow;
    public DateTime LastUpdatedAt { get; private set; }=default!;
    public string Title {get;set;} =default!;
    public string? Description { get; set;} =default!;
    public IReadOnlyCollection<Node> Nodes => _vertices.AsReadOnly();
    public IReadOnlyCollection<Edge> Edges => _edges.AsReadOnly();

    public int Order => _vertices.Count;
    public int Size => _edges.Count;
    /*
    public Graph(ApplicationUser user)
    {
        Owner = user ?? throw new ArgumentNullException(nameof(user));
        OwnerId = user.Id;

    }*/
    private Graph()
    {
        Id= Guid.NewGuid();
    }
    private Graph(string title) 
    {
        Id=Guid.NewGuid();
        Title= title;
    }
    private Graph(string title, string description)
    {
        Id=Guid.NewGuid();
        Title= title;
        Description = description;
    }
    public static Graph Create(string title)=> new(title);
    public static Graph Create(string title, string description)=>new(title,description);
    public void Touch() => LastUpdatedAt = DateTime.UtcNow;

    #region Nodes operations

    
    public static Node CreateNode(Guid graphId,string tag,double activity,int interaction)
    {
        return Node.Create(graphId,tag,activity,interaction);
    }
    public Node? GetNodeFromGraphById(int nodeId) 
            => _vertices.FirstOrDefault(n=>n.Id==nodeId);
    public Node? GetNodeFromGraphByTag(string tag)
            => _vertices.FirstOrDefault(n=>n.Tag==tag);
    // Add one or more than one node
    public Node AddNode(Node node)
    {
        if (_vertices.Any(n => n.Equals(node) ))
            throw new DomainException($"Node already exists in this graph.");

        _vertices.Add(node);

        return node;
    }

    public void AddNodes(IEnumerable<Node> nodes)
    {
        foreach(var node in nodes)
        {
            AddNode(node);
        }
    }

    // Deleting a node 
    public bool DeleteOneNode( Node node)
    {
        if (_vertices.Contains(node))
        {
            var nodeId= node.Id;
            _vertices.Remove(node);
            Edge edge = _edges.FirstOrDefault(e => e.NodeAId == nodeId ||  e.NodeBId == nodeId)!;
           if(edge is not null){
                _edges.Remove(edge);
            }

            return true;
        }
        return false;
    }



    #endregion
    public void ConnectNodes(Node a, Node b)
    {
        if (!_vertices.Contains(a) || !_vertices.Contains(b))
            throw new DomainException("Both nodes must belong to the same graph.");
        
        if (_edges.Any(e => e.Connects(a, b)))
            throw new DomainException("Edge already exists.");

        var edge = Edge.Create(Id,a, b);

        _edges.Add(edge);
        a.UpdateLinksCount();
        b.UpdateLinksCount();

        Touch();
    }

    public Edge GetEdgeFromGraph(int nodeAId, int nodeBId)
    {
        if (!_vertices.Any(n=>n.Id==nodeAId) || !_vertices.Any(n=>n.Id==nodeBId))
            throw new DomainException("Both nodes must belong to the same graph.");
        
        return _edges.FirstOrDefault(e=>(e.NodeAId==nodeAId && e.NodeBId==nodeBId)
        || (e.NodeAId==nodeBId && e.NodeBId==nodeAId))!;
    }

    public void DisConnectNodes(Edge edge) => _edges.Remove(edge);
   
    public bool ContainsNode(Node node)
    {
        return _vertices.Contains(node);
    }

    //Computation
    public bool ComputeDegreeCentrality()
    {
        if (Order < 2) return false;
        foreach (var node in _vertices)
        {
            int degree = node.Connections;
            double normalized = Order > 1 ? (double)degree / (Order - 1) : 0;

            node.SetCentrality(degree, normalized);
        }
        return true;
    }
    public bool IsConnected()
    {
        if (Order <= 1)
            return true;

        var visited = new HashSet<int>();
        var stack = new Stack<Node>();

        var startNode = _vertices.First();
        stack.Push(startNode);
        visited.Add(startNode.Id);

        while (stack.Count > 0)
        {
            var current = stack.Pop();

            var neighbors = _edges
                .Where(e => e.NodeAId == current.Id || e.NodeBId == current.Id)
                .Select(e =>
                    e.NodeAId == current.Id
                        ? _vertices.First(n => n.Id == e.NodeBId)
                        : _vertices.First(n => n.Id == e.NodeAId)
                );

            foreach (var neighbor in neighbors)
            {
                if (!visited.Contains(neighbor.Id))
                {
                    visited.Add(neighbor.Id);
                    stack.Push(neighbor);
                }
            }
        }

        return visited.Count == Order;
    }

   
}

