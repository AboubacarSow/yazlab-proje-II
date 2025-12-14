using sna_domain.Exceptions;

namespace sna_domain.Entities;

public class Edge
{
    private Guid _nodeAId;
    private Guid _nodeBId;
    private Node _nodeA = default!;
    private Node _nodeB = default!;

    public Guid NodeAId => _nodeAId;
    public Guid NodeBId => _nodeBId;
    public Node NodeA => _nodeA;
    public Node NodeB => _nodeB;
    public double Weight { get; private set; }

    private void CalculateWeight()
    {
        double activity = Math.Pow(_nodeA.Activity - _nodeB.Activity, 2);

        double interaction = Math.Pow(_nodeA.Interaction - _nodeB.Interaction, 2);

        double connection = Math.Pow(_nodeA.Links - _nodeB.Links, 2);

        double sum_properties = activity + interaction + connection;

        Weight = 1.0 / (1.0 + Math.Sqrt(sum_properties));
    }
    private Edge() { }
    private Edge(Node a, Node b)
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

        CalculateWeight();
    }
    public static Edge Create(Node node_1, Node node_2)
    {
        //Est ce a node can be connected to itself
        //Thing to verify later on
        if (node_1 == node_2)
            throw new DomainException("Self-loops are not allowed.");

        return new Edge(node_1, node_2);
    }
    public bool Connects(Node a, Node b)
    {
        return (_nodeA == a && _nodeB == b) ||
               (_nodeA == b && _nodeB == a);
    }
}

