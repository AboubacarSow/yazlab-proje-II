using sna_application.Graphs.Dtos;
using sna_domain.Entities;

namespace sna_application.Graphs.Queries.GetGraphById;

public record GetGraphByIdQuery(Guid Id): IRequest<GraphDto>;
internal class GetGraphByIdHandler(IGraphRepository _graphRepo) 
: IRequestHandler<GetGraphByIdQuery, GraphDto>
{
    public async Task<GraphDto> Handle(GetGraphByIdQuery request, CancellationToken cancellationToken)
    {
       var entity = await _graphRepo.GetGraphByIdAsync(request.Id,false) ??
        throw new NotFoundException($"Graph with Id:{request.Id} not found");
        var graphDto = new GraphDto(entity.Id, entity.Title, entity.Description!, entity.Order, entity.Size)
        {
            Nodes= entity.Nodes.ToList().Adapt<List<NodeDto>>(),
            Edges = entity.Edges.ToList().Adapt<List<EdgeDto>>()
        };
        return graphDto;
    }
}
