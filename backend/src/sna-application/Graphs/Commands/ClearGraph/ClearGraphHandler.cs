
namespace sna_application.Graphs.Commands.ClearGraph;


public record ClearGraphCommand(Guid GraphId): IRequest<GraphDto>;
internal class ClearGraphHandler(IGraphRepository _graphRepo, IUnitOfWork _unitOfWork)
 : IRequestHandler<ClearGraphCommand, GraphDto>
{
    public async Task<GraphDto> Handle(ClearGraphCommand request, CancellationToken cancellationToken)
    {
        var graph= await _graphRepo.GetGraphByIdAsync(request.GraphId,true)
        ?? throw new NotFoundException($"Graph with Id:{request.GraphId} not found");
        var nodes = graph.Nodes.ToList() ;
         foreach(var node in nodes)
        {
            graph.Nodes.Remove(node);
        }

        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return graph.Adapt<GraphDto>();
    }
}
