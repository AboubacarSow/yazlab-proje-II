using System.Security.Claims;

namespace sna_application.Graphs.Queries.GetAllGraphs;

public record GetAllGraphsQuery : IRequest<List<GraphsDto>>;

internal class GetAllGraphsHandler(IGraphRepository _repository) :
IRequestHandler<GetAllGraphsQuery, List<GraphsDto>>
{
    public async Task<List<GraphsDto>> Handle(GetAllGraphsQuery request, CancellationToken cancellationToken)
    {
        var entities = await _repository.GetAllGraphsAsync(false);
        var dtos = entities.Select(entity=>
        new GraphsDto(entity.Id, entity.Title, entity.Description!,
         entity.Order, entity.Size,
         entity.OwnerId!.Value,
         entity.CreatedOn,
         entity.LastUpdatedAt)
        {
            Nodes= entity.Nodes.ToList().Adapt<List<NodeDto>>(),
            Edges = entity.Edges.ToList().Adapt<List<EdgeDto>>()
        }).ToList();
        return dtos;
    }
}


