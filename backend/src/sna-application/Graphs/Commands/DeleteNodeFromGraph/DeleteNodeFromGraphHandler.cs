
namespace sna_application.Graphs.Commands.DeleteNodeFromGraph;
public record DeleteNodeFromGraphCommand(Guid GraphId, int NodeId):IRequest<GraphDto>;

internal class DeleteNodeFromGraphHandler(IGraphRepository graphRepository, IUnitOfWork unitOfWork)
: IRequestHandler<DeleteNodeFromGraphCommand, GraphDto>
{
    public async Task<GraphDto> Handle(DeleteNodeFromGraphCommand request, CancellationToken cancellationToken)
    {
        //retreive graph;
        var graph = await graphRepository.GetGraphByIdAsync(request.GraphId,true)??
        throw new NotFoundException($"Graph with Id:{request.GraphId} not found");
        var node = graph.GetNodeFromGraphById(request.NodeId)??
        throw new NotFoundException($"Node with Id:{request.NodeId} not found");
        graph.DeleteOneNode(node);
        await unitOfWork.SaveChangesAsync(cancellationToken);
        var entity = await graphRepository.GetGraphByIdAsync(request.GraphId,false) ??
        throw new NotFoundException($"Graph with Id:{request.GraphId} not found");
        var graphDto = new GraphDto(entity.Id, entity.Title, entity.Description!, entity.Order, entity.Size)
        {
            Nodes= entity.Nodes.ToList().Adapt<List<NodeDto>>(),
            Edges = entity.Edges.ToList().Adapt<List<EdgeDto>>()
        };
        return graphDto;
    }
}
