using sna_domain.Exceptions;

namespace sna_domain.Entities;

public class Node : BaseEntity, IEquatable<Node>
{
    
    public Guid GraphId {get;private set;}
    public Graph Graph { get; private set; } = default!;
    public string Tag { get; set; } = default!;

    //Characteristic
    public double Activity { get; set; }
    public int Interaction { get; set; }
    public double? NormalizedDegreeCentrality { get; private set; }
    public int DegreeCentrality { get; private set; }
    public int Connections { get; private set; }

    private Node(Guid graphId) { GraphId = graphId; }

    private Node(Guid graphId,string tag) 
    {
        Tag = tag;
        GraphId = graphId;
    }
    private Node(Guid graphId,string tag, double activity, int interaction)
    {
        GraphId= graphId;
        Tag= tag;
        Activity = activity;
        Interaction = interaction;
    }
    
    internal static Node Create(Guid graphId,string tag,double activity,int interaction)
    =>new(graphId,tag,activity,interaction);

    internal static Node Create(Guid graphId) => new(graphId);
    internal static Node Create(Guid graphId, string tag)=>new(graphId,tag);

    public void UpdateLinksCount()
    {
        Connections++;
    }
    internal IEnumerable<Node> GetNeighbors(Graph graph)
    {
        return graph.Edges
            .Where(e => e.NodeAId == Id || e.NodeBId == Id)
            .Select(e => e.NodeAId == Id ? e.NodeB : e.NodeA);
    }
    internal void SetCentrality(int degree, double normalized)
    {
        //Need to handle edge cases when degree < 0 and normalize is not inside of [0,1]
        if (degree < 0)
        throw new DomainException("Degree cannot be negative.");

        if (normalized < 0 || normalized > 1)
        throw new DomainException("Normalized centrality must be in [0,1]."); 
        
        DegreeCentrality = degree;
        NormalizedDegreeCentrality = normalized;

    }

    public bool Equals(Node? other)
    {
        if(other is null) return false;
        if(ReferenceEquals(this, other)) return true;
        return Id==other.Id;
    }

    public override bool Equals(object? obj)
    {
        return Equals(obj as Node);
    }

    public override int GetHashCode()
    {
        return Id.GetHashCode();
    }
}

