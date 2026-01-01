
namespace sna_application.Graphs.Commands.DeleteEdgeFromGraph;


public record DeleteEdgeFromGraphCommand(Guid GraphId, int NodeAId,int NodeBId):IRequest<GraphDto>;

internal class DeleteEdgeFromGraphValidator: AbstractValidator<DeleteEdgeFromGraphCommand>
{
    public DeleteEdgeFromGraphValidator()
    {
        RuleFor(e=>e.GraphId).NotEmpty().WithMessage("Edge'GraphId is required");

        RuleFor(e=>e.NodeAId).NotEmpty().WithMessage("Edge's NodeId is required");

        RuleFor(e=>e.NodeBId).NotEmpty().WithMessage("Edge's NodeId is required");
    }
}

internal class DeleteEdgeFromGraphHandler(IGraphRepository graphRepository,
IUnitOfWork unitOfWork) : IRequestHandler<DeleteEdgeFromGraphCommand, GraphDto>
{
    public async Task<GraphDto> Handle(DeleteEdgeFromGraphCommand request, CancellationToken cancellationToken)
    {
         var graph = await graphRepository.GetGraphByIdAsync(request.GraphId,true) ??
        throw new NotFoundException($"Graph with Id: {request.GraphId} not found");
        var edge = graph.GetEdgeFromGraph(request.NodeAId, request.NodeBId)?? 
        throw new NotFoundException($"Edge between {request.NodeAId} and {request.NodeBId} not found");
        graph.DisConnectNodes(edge);
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
