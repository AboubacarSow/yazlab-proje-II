namespace sna_application.Graphs.Queries.GetAllGraphs;

public record GetAllGraphsQuery : IRequest<List<GraphDto>>;

internal class GetAllGraphsHandler(IGraphRepository _repository) :
IRequestHandler<GetAllGraphsQuery, List<GraphDto>>
{
    public async Task<List<GraphDto>> Handle(GetAllGraphsQuery request, CancellationToken cancellationToken)
    {
        var entities = await _repository.GetAllGraphsAsync(false);
        var dtos = entities.Adapt<List<GraphDto>>();
        return dtos;
    }
}
