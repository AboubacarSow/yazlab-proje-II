
namespace sna_application.Graphs.Commands.DeleteNodeFromGraph;
public record DeleteNodeFromGraphCommand(int GraphId, int NodeId):IRequest<bool>;

internal class DeleteNodeFromGraphHandler(IGraphRepository graphRepository, IUnitOfWork unitOfWork)
: IRequestHandler<DeleteNodeFromGraphCommand, bool>
{
    public async Task<bool> Handle(DeleteNodeFromGraphCommand request, CancellationToken cancellationToken)
    {
        //retreive graph;
        var graph = await graphRepository.GetGraphByIdAsync(request.GraphId,true)??
        throw new NotFoundException($"Graph with Id:{request.GraphId} not found");
        var node = graph.GetNodeFromGraph(request.NodeId)??
        throw new NotFoundException($"Node with Id:{request.NodeId} not found");
        var result= graph.DeleteOneNode(node);
        var efresult = await unitOfWork.SaveChangesAsync(cancellationToken);
        return result && efresult;
    }
}
