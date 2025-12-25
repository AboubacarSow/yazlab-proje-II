
namespace sna_application.Graphs.Commands.DeleteGraph;


public record DeleteGraphCommand(Guid GraphId): IRequest<bool>;
internal class DeleteGraphHandler(IGraphRepository _graphRepo, IUnitOfWork _unitOfWork)
 : IRequestHandler<DeleteGraphCommand, bool>
{
    public async Task<bool> Handle(DeleteGraphCommand request, CancellationToken cancellationToken)
    {
        var graph= await _graphRepo.GetGraphByIdAsync(request.GraphId,true)
        ?? throw new NotFoundException($"Graph with Id:{request.GraphId} not found");
        var nodes = graph.Nodes.ToList() ;
         foreach(var node in nodes)
        {
            graph.Nodes.Remove(node);
        }
         _graphRepo.DeleteGraph(graph);
         return await _unitOfWork.SaveChangesAsync(cancellationToken);
    }
}
