
namespace sna_application.Graphs.Commands.EditNodeInGraph;

public record EditNodeInGraphCommand(int Id, 
        int GraphId,
        string Tag,
        double Activity,
        int Interaction):IRequest<(NodeDto, bool)>;


internal class EditNodeInGraphHandler(IGraphRepository graphRepository, IUnitOfWork unitOfWork) :
IRequestHandler<EditNodeInGraphCommand, (NodeDto, bool)>
{
    public async Task<(NodeDto, bool)> Handle(EditNodeInGraphCommand request, CancellationToken cancellationToken)
    {
        
        var graph= await graphRepository.GetGraphByIdAsync(request.GraphId,true)
        ?? throw new NotFoundException($"Graph with Id:{request.GraphId} not found");
        var node = graph.GetNodeFromGraph(request.Id)
        ?? throw new NotFoundException($"Node with Id:{request.Id} not found in graph with Id:{request.GraphId}");
        node.Tag = request.Tag;
        node.Activity = request.Activity;
        node.Interaction = request.Interaction;
        var nodeDto = node.Adapt<NodeDto>();
         var result = await unitOfWork.SaveChangesAsync(cancellationToken);
         return (nodeDto, result);
    }
}
