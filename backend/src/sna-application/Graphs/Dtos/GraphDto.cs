namespace sna_application.Graphs.Dtos;
public record GraphDto(int Id, string Tag,int Order, int Size);
public record NodeDto(int Id, int GraphId,
    string Tag,
    double Activity,
    int Interaction);
public record EdgeDto(int Id, 
            double Weight,
            int NodeAId,
            int NodeBId);       