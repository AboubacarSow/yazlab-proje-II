namespace sna_application.Graphs.Queries.GetAllGraphs;

public record GetAllGraphsQuery : IRequest<List<GraphDto>>;

internal class GetAllGraphsHandler(IGraphRepository _repository) :
IRequestHandler<GetAllGraphsQuery, List<GraphDto>>
{
    public async Task<List<GraphDto>> Handle(GetAllGraphsQuery request, CancellationToken cancellationToken)
    {
        var entities = await _repository.GetAllGraphsAsync(false);
        var dtos = entities.Select(entity=>
        new GraphDto(entity.Id, entity.Title, entity.Description!, entity.Order, entity.Size)
        {
            Nodes= entity.Nodes.ToList().Adapt<List<NodeDto>>(),
            Edges = entity.Edges.ToList().Adapt<List<EdgeDto>>()
        }).ToList();
        return dtos;
    }
}
