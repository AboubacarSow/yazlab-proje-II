using sna_application.Graphs.Dtos;

namespace sna_application.Graphs.Queries.GetGraphById;

public record GetGraphByIdQuery(int Id): IRequest<GraphDto>;
internal class GetGraphByIdHandler(IGraphRepository _graphRepo) 
: IRequestHandler<GetGraphByIdQuery, GraphDto>
{
    public async Task<GraphDto> Handle(GetGraphByIdQuery request, CancellationToken cancellationToken)
    {
       var entity = await _graphRepo.GetGraphByIdAsync(request.Id,false) ??
        throw new NotFoundException($"Graph with Id:{request.Id} not found");
       var graphDto= entity.Adapt<GraphDto>();
        return graphDto;
    }
}
