using sna_domain.Exceptions;

namespace sna_domain.Entities;

public class Graph 
{
    //public Guid OwnerId {get; private set;}
    //public ApplicationUser Owner {get; private set;}= default!;
    public Guid Id {get;set;}
    private  List<Node> _nodes = [];
    private  List<Edge> _edges = [];
    public DateTime CreatedOn { get; private set; } = DateTime.UtcNow;
    public DateTime LastUpdatedAt { get; private set; }=default!;
    public string Title {get;set;} =default!;
    public string? Description { get; set;} =default!;
    public ICollection<Node> Nodes => _nodes;
    public ICollection<Edge> Edges => _edges;
    private readonly Dictionary<int, List<Edge>> _adjacencyList = new();


    public int Order => _nodes.Count;
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
    private Graph(string title, string? description)
    {
        Id=Guid.NewGuid();
        Title= title;
        Description = description;
    }
    public static Graph Create(string title)=> new(title);
    public static Graph Create(string title, string? description)=>new(title,description);
    public void Touch() => LastUpdatedAt = DateTime.UtcNow;

    #region Nodes operations

    
    public static Node CreateNode(Guid graphId,string tag,double activity,int interaction)
    {
        return Node.Create(graphId,tag,activity,interaction);
    }
    public Node? GetNodeFromGraphById(int nodeId) 
            => _nodes.FirstOrDefault(n=>n.Id==nodeId);
    public Node? GetNodeFromGraphByTag(string tag)
            => _nodes.FirstOrDefault(n=>n.Tag==tag);
    // Add one or more than one node
    public Node AddNode(Node node)
    {
        if (_nodes.Any(n => n.Equals(node) ))
            throw new DomainException($"Node already exists in this graph.");

        _nodes.Add(node);

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
        if (_nodes.Contains(node))
        {
            var nodeId= node.Id;
            _nodes.Remove(node);
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
        if (!_nodes.Contains(a) || !_nodes.Contains(b))
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
        if (!_nodes.Any(n=>n.Id==nodeAId) || !_nodes.Any(n=>n.Id==nodeBId))
            throw new DomainException("Both nodes must belong to the same graph.");
        
        return _edges.FirstOrDefault(e=>(e.NodeAId==nodeAId && e.NodeBId==nodeBId)
        || (e.NodeAId==nodeBId && e.NodeBId==nodeAId))!;
    }

    public void DisConnectNodes(Edge edge) => _edges.Remove(edge);
   
    public bool ContainsNode(Node node)
    {
        return _nodes.Contains(node);
    }

    //Computation
    public bool ComputeDegreeCentrality()
    {
        if (Order < 2) return false;
        foreach (var node in _nodes)
        {
            int degree = node.Connections;
            decimal normalized = Order > 1 ? (decimal)degree / (Order - 1) : 0m;
            var normalizedRounded = Math.Round(
                normalized,
                3,
                MidpointRounding.AwayFromZero
            );
            node.SetCentrality(degree, normalizedRounded);
        }
        return true;
    }
    public bool IsConnected()
    {
        if (Order <= 1)
            return true;

        var visited = new HashSet<int>();
        var stack = new Stack<Node>();

        var startNode = _nodes.First();
        stack.Push(startNode);
        visited.Add(startNode.Id);

        while (stack.Count > 0)
        {
            var current = stack.Pop();

            var neighbors = _edges
                .Where(e => e.NodeAId == current.Id || e.NodeBId == current.Id)
                .Select(e =>
                    e.NodeAId == current.Id
                        ? _nodes.First(n => n.Id == e.NodeBId)
                        : _nodes.First(n => n.Id == e.NodeAId)
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

