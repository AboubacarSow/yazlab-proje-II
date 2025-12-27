namespace sna_application.Analysis.Dtos;

public record ComponentDto(int Id, IReadOnlyList<NodeDto> Nodes);
