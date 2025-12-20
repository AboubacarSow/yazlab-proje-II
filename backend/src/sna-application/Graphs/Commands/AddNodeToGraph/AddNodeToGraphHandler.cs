using sna_domain.Entities;

namespace sna_application.Graphs.Commands.AddNodeToGraph;

public record AddNodeToGraphCommand(int GraphId,
    string Tag,
    double Activity,
    int Interaction) : IRequest<NodeDto>;


public class AddNodeToGraphCommandValidator: AbstractValidator<AddNodeToGraphCommand>
{
    public AddNodeToGraphCommandValidator()
    {
        RuleFor(n=>n.GraphId).NotEmpty()
                        .WithMessage("GraphId should be provide");
        RuleFor(n=>n.Tag).MinimumLength(2)
                        .WithMessage("Node's tag should be at least three(3) characters");
        RuleFor(n=>n.Activity).InclusiveBetween(0.0,1.0)
                        .WithMessage("Node's activity should be in the range of 0.0 and 1.0");
        RuleFor(n=>n.Interaction).GreaterThanOrEqualTo(1)
                                .WithMessage("Node's Interaction should be greater than or equal to 1");
    }
}
internal class AddNodeToGraphHandler(IGraphRepository _graphRepo, IUnitOfWork _unitOfwork)
: IRequestHandler<AddNodeToGraphCommand, NodeDto>
{
    public async Task<NodeDto> Handle(AddNodeToGraphCommand request, CancellationToken cancellationToken)
    {
        var node  = Graph.CreateNode(request.GraphId,
                                request.Tag,
                                request.Activity,
                                request.Interaction);
        var graph = await _graphRepo.GetGraphByIdAsync(request.GraphId,true) ??
        throw new NotFoundException($"Graph with Id: {request.GraphId} not found");

        if(graph.Nodes.Any(n=>n.Tag ==request.Tag))
            throw new DomainException("Node tag must be unique");
        var result = graph.AddNode(node);
        await _unitOfwork.SaveChangesAsync(cancellationToken);
        return node.Adapt<NodeDto>();
    }
}
