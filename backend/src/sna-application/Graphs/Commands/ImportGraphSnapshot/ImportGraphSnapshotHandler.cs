
using sna_domain.Entities;

namespace sna_application.Graphs.Commands.ImportGraphSnapshot;




public record ImportGraphSnapshotCommand(
    Guid Id,
    string Title,
    string? Description,
    List<NodeSnapshotDto> Nodes,
    List<EdgeSnapshotDto> Edges): IRequest<GraphDto>;

public class ImportGraphSnapshotCommandValidator
    : AbstractValidator<ImportGraphSnapshotCommand>
{
    public ImportGraphSnapshotCommandValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty()
            .MaximumLength(150);

        RuleFor(x => x.Nodes)
            .NotEmpty()
            .Must(nodes => nodes.Select(n => n.Id).Distinct().Count() == nodes.Count)
            .WithMessage("Duplicate node TempId detected");

        RuleForEach(x => x.Nodes).SetValidator(new NodeSnapshotValidator());

        RuleForEach(x => x.Edges).SetValidator(new EdgeSnapshotValidator());
    }
}
public class NodeSnapshotValidator
    : AbstractValidator<NodeSnapshotDto>
{
    public NodeSnapshotValidator()
    {
        RuleFor(x => x.Id).GreaterThan(0);
        RuleFor(x => x.Tag).NotEmpty().MaximumLength(50);
        RuleFor(x => x.Activity).GreaterThanOrEqualTo(0);
        RuleFor(x => x.Interaction).GreaterThanOrEqualTo(0);
    }
}
public class EdgeSnapshotValidator
    : AbstractValidator<EdgeSnapshotDto>
{
    public EdgeSnapshotValidator()
    {
        RuleFor(x => x.NodeAId).GreaterThan(0);
        RuleFor(x => x.NodeBId).GreaterThan(0);

        RuleFor(x => x)
            .Must(x => x.NodeAId != x.NodeBId)
            .WithMessage("Self-loop is not allowed");
    }
}

internal class ImportGraphSnapshotHandler(
    IGraphRepository graphRepository, IUnitOfWork unitOfWork
) : IRequestHandler<ImportGraphSnapshotCommand, GraphDto>
{
    public async Task<GraphDto> Handle(ImportGraphSnapshotCommand request, CancellationToken cancellationToken)
    {
        var graph = Graph.Create(
            request.Title,
            request.Description
        );

        var nodeMap = new Dictionary<int, Node>();

        foreach (var nodeDto in request!.Nodes)
        {
            var node = Graph.CreateNode(graph.Id,
                            nodeDto.Tag,
                            nodeDto.Activity,
                            nodeDto.Interaction);
            graph.AddNode(node);
            nodeMap[nodeDto.Id] = node;
        }
        await graphRepository.AddGraphAsync(graph);
        await unitOfWork.SaveChangesAsync(cancellationToken);
        foreach (var edgeDto in request.Edges)
        {
            var from = nodeMap[edgeDto.NodeAId];
            var to   = nodeMap[edgeDto.NodeBId];

            graph.ConnectNodes(from, to);
        }
        await unitOfWork.SaveChangesAsync(cancellationToken);
        var entity = await graphRepository.GetGraphByIdAsync(graph.Id, false)??
        throw new FailedToImportGraphSnapshotException("Import Graph Snapshot Failed");
        return  new GraphDto(entity.Id, entity.Title, entity.Description!, entity.Order, entity.Size)
        {
            Nodes= entity.Nodes.ToList().Adapt<List<NodeDto>>(),
            Edges = entity.Edges.ToList().Adapt<List<EdgeDto>>()
        };

    }
}
