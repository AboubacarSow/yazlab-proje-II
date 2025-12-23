
namespace sna_application.Graphs.Commands.DeleteEdgeFromGraph;


public record DeleteEdgeFromGraphCommand(Guid GraphId, int NodeAId,int NodeBId):IRequest<bool>;

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
IUnitOfWork unitOfWork) : IRequestHandler<DeleteEdgeFromGraphCommand, bool>
{
    public async Task<bool> Handle(DeleteEdgeFromGraphCommand request, CancellationToken cancellationToken)
    {
         var graph = await graphRepository.GetGraphByIdAsync(request.GraphId,true) ??
        throw new NotFoundException($"Graph with Id: {request.GraphId} not found");
        var edge = graph.GetEdgeFromGraph(request.NodeAId, request.NodeBId);
        graph.DisConnectNodes(edge);
        return await unitOfWork.SaveChangesAsync(cancellationToken);
    }
}
