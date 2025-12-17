namespace sna_application.Graphs.Dtos;
public record GraphDto(Guid Id, string Tag);
public record NodeDto(Guid Id, string Tag);
public record EdgeDto(Guid Id);