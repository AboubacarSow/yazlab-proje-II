
using sna_domain.Entities;

namespace sna_application.Graphs.Commands.AddEdgeToGraph;


public record AddEdgeToGraphCommand(int GraphId, int NodeAId, int NodeBId): IRequest<EdgeDto>;

internal class AddEdgeToGraphHandler(IGraphRepository graphRepository, IUnitOfWork unitOfWork) :
IRequestHandler<AddEdgeToGraphCommand, EdgeDto>
{
    public async Task<EdgeDto> Handle(AddEdgeToGraphCommand request, CancellationToken cancellationToken)
    {
        var graph = await graphRepository.GetGraphByIdAsync(request.GraphId,true) ??
        throw new NotFoundException($"Graph with Id: {request.GraphId} not found");
        var nodeA= graph.GetNodeFromGraph(request.NodeAId) ;
        var nodeB= graph.GetNodeFromGraph(request.NodeBId) ;
        if(nodeA is null || nodeB is null) 
            throw new DomainException($"Node with Id {request.NodeAId} or {request.NodeBId} not found or belongs to this graph"); 
        graph.ConnectNodes(nodeA, nodeB);
        await unitOfWork.SaveChangesAsync(cancellationToken);
        return graph.GetEdgeFromGraph(nodeA.Id,nodeB.Id).Adapt<EdgeDto>();
    }
}
