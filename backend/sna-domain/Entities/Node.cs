using sna_domain.Exceptions;

namespace sna_domain.Entities;

public class Node : BaseEntity
{
    public string Name { get; set; } = default!;
    public double Activity { get; set; }
    public int Interaction { get; set; }
    public string Description { get; set; } = default!;
    public double? NormalizedDegreeCentrality { get; private set; }
    public int DegreeCentrality { get; private set; }
    private List<Edge> _edges = [];
    public IReadOnlyCollection<Edge> Edges => _edges.AsReadOnly();
    internal void AddEdge(Edge edge) => _edges.Add(edge);
    public int Links => _edges.Count;
    public Node() { }
    public Node(string name, string description)
    {
        Name = name;
        Description = description;
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

}

