using sna_domain.Entities;

namespace sna_application.Graphs.Dtos;
public record GraphDto(Guid Id, 
                    string Title,
                    string Description,
                    int Order,
                    int Size
                    )
{
    public List<NodeDto> Nodes{get;set;}=[];
    public List<EdgeDto> Edges{get;set;} = [];
}

public record GraphSummary(Guid Id, int NodeCount, int EdgeCount,string Title, string Description,
                            bool IsConnected, bool IsWeighted, bool IsDirected,
                            double Density, double AverageDegree);

public record ExportGraphDto(
    Guid Id,
    string Title,
    string Description,
    bool IsConnected,
    bool IsWeighted,
    bool IsDirected,
    int Order,
    int Size,
    IReadOnlyList<ExportNodeDto> Nodes,
    IReadOnlyList<ExportEdgeDto> Edges 
);

public record ExportNodeDto(int Id,
                        Guid GraphId,
                        string Tag,
                        double Activity,
                        int Interaction);


public record ExportEdgeDto(int NodeA, int NodeB, double Weight);
public record NodeDto(int Id, Guid GraphId,
    string Tag,
    double Activity,
    int Interaction);
public record EdgeDto(
            double Weight,
            int NodeAId,
            int NodeBId);      

public record NodeSnapshotDto(
    int Id,        // id du snapshot (frontend)
    string Tag,
    double Activity,
    int Interaction
);

public record EdgeSnapshotDto(
    int NodeAId,         // TempId
    int NodeBId,         // TempId
    double? Weight
);
