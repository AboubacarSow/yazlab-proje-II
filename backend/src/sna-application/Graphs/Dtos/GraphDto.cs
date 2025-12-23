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
public record NodeDto(int Id, Guid GraphId,
    string Tag,
    double Activity,
    int Interaction);
public record EdgeDto(int Id, 
            double Weight,
            int NodeAId,
            int NodeBId);       