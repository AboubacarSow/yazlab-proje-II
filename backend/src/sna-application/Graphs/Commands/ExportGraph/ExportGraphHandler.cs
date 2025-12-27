
namespace sna_application.Graphs.Queries.ExportGraph;


public record ExportGraphCommand (Guid Id):IRequest<ExportGraphDto>;

internal class ExportGraphHandler(IGraphRepository graphRepository) : IRequestHandler<ExportGraphCommand, ExportGraphDto>
{
    public async Task<ExportGraphDto> Handle(ExportGraphCommand request, CancellationToken cancellationToken)
    {
        var graph = await graphRepository.GetGraphByIdAsync(request.Id, false)??
        throw new NotFoundException($"Graph with Id : {request.Id} not found");
        var dto = new ExportGraphDto(
            Id:graph.Id,
            Title: graph.Title,
            Description:graph.Description!,
            IsConnected:graph.IsConnected(),
            IsWeighted:true,
            IsDirected:false,
            Order:graph.Order,
            Size: graph.Size,
            Nodes: [.. graph.Nodes.Select(n=> new ExportNodeDto(n.Id,n.GraphId, n.Tag, n.Activity,n.Interaction))],
            Edges: [.. graph.Edges.Select(e=> new ExportEdgeDto(e.NodeAId,e.NodeBId,e.Weight))]
        );

        return dto;
    }
}
