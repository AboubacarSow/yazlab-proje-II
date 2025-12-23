using sna_domain.Exceptions;

namespace sna_domain.Entities;

public class Edge
{
    public Guid GraphId {get; private set;}
    public Graph Graph { get; private set; } = default!;

    private int _nodeAId;
    private int _nodeBId;
    private Node _nodeA = default!;
    private Node _nodeB = default!;

    public int NodeAId => _nodeAId;
    public int NodeBId => _nodeBId;
    public Node NodeA => _nodeA;
    public Node NodeB => _nodeB;
    public double Weight { get; private set; }

    private void CalculateWeight()
    {
        double activity = Math.Pow(_nodeA.Activity - _nodeB.Activity, 2);

        double interaction = Math.Pow(_nodeA.Interaction - _nodeB.Interaction, 2);

        double connection = Math.Pow(_nodeA.Connections - _nodeB.Connections, 2);

        double sum_properties = activity + interaction + connection;

        Weight = 1.0 / (1.0 + Math.Sqrt(sum_properties));
    }
    private Edge() { }
    private Edge(Guid graphId,Node a, Node b)
    {
        // deterministic ordering (important!)
        if (a.Id.CompareTo(b.Id) < 0)
        {
            _nodeA = a;
            _nodeB = b;
        }
        else
        {
            _nodeA = b;
            _nodeB = a;
        }

        _nodeAId = _nodeA.Id;
        _nodeBId = _nodeB.Id;
        GraphId= graphId;

        CalculateWeight();
    }
    internal static Edge Create(Guid graphId,Node node_1, Node node_2)
    {
        //Est ce a node can be connected to itself
        //Thing to verify later on
        if (node_1.Equals(node_2))
            throw new DomainException("Self-loops are not allowed.");

        return new Edge(graphId,node_1, node_2 );
    }
    public bool Connects(Node a, Node b)
    {
        return (_nodeA.Equals(a) && _nodeB.Equals(b)) ||
               (_nodeA.Equals(b)  && _nodeB.Equals(a));
    }
}

