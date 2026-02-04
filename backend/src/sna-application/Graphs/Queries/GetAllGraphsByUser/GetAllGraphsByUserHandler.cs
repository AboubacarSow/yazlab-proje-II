namespace sna_application.Graphs.Queries.GetAllGraphsByUser;

public record GetAllGraphsByUserQuery(Guid UserId) : IRequest<List<GraphsDto>>;

internal class GetAllGraphsByUserHandler(IGraphRepository _repository) :
IRequestHandler<GetAllGraphsByUserQuery, List<GraphsDto>>
{
    public async Task<List<GraphsDto>> Handle(GetAllGraphsByUserQuery request, CancellationToken cancellationToken)
    {
        var entities = await _repository.GetAllGraphsByUserAsync(request.UserId,false);
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




