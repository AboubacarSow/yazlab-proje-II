
using sna_domain.Entities;

namespace sna_application.Graphs.Commands.ImportGraph;

public record NodeImportDto(
    string Tag,
    double Activity,
    int Interaction);
public record EdgeImportDto(string NodeTagA, string NodeTagB);

public class ImportGraphCommand: IRequest<GraphDto>
{
    public string Title{get;set;}=null!;
    public string? Description {get;set;}
    public List<NodeImportDto> Nodes{get;set;}=[];
    public List<EdgeImportDto> Edges {get;set;} =[];
}

public class GraphImportValidation : AbstractValidator<ImportGraphCommand>
{
    public GraphImportValidation()
    {
        // Graph
        RuleFor(g => g.Title)
            .NotEmpty()
            .WithMessage("Graph tag is required");

        RuleFor(g => g.Nodes)
            .NotNull()
            .NotEmpty()
            .WithMessage("Graph must contain at least one node");

        // Nodes
        RuleForEach(g => g.Nodes)
            .SetValidator(new NodeImportValidator());

        RuleFor(g => g.Nodes)
            .Must(HaveUniqueNodeTags)
            .WithMessage("Node tags must be unique");

        // Edges
        RuleForEach(g => g.Edges)
            .SetValidator(new EdgeImportValidator());

        RuleFor(g => g)
            .Must(HaveValidEdgeReferences)
            .WithMessage("Edges reference unknown nodes");

        RuleFor(g => g.Edges)
            .Must(HaveNoDuplicateEdges)
            .WithMessage("Duplicate edges detected");
    }

    // ---- Custom rules ----

    private static bool HaveUniqueNodeTags(List<NodeImportDto> nodes)
        => nodes.Select(n => n.Tag).Distinct().Count() == nodes.Count;

    private static bool HaveValidEdgeReferences(ImportGraphCommand graph)
    {
        var nodeTags = graph.Nodes.Select(n => n.Tag).ToHashSet();

        return graph.Edges.All(e =>
            nodeTags.Contains(e.NodeTagA) &&
            nodeTags.Contains(e.NodeTagB)
        );
    }

    private static bool HaveNoDuplicateEdges(List<EdgeImportDto> edges)
    {
        return edges
            .Select(e =>
                string.Compare(e.NodeTagA, e.NodeTagB) < 0
                    ? $"{e.NodeTagA}-{e.NodeTagB}"
                    : $"{e.NodeTagB}-{e.NodeTagA}")
            .Distinct()
            .Count() == edges.Count;
    }
}


public class NodeImportValidator : AbstractValidator<NodeImportDto>
{
    public NodeImportValidator()
    {
        RuleFor(n => n.Tag)
            .NotEmpty()
            .WithMessage("Node tag is required");

        RuleFor(n => n.Activity)
            .GreaterThanOrEqualTo(0);

        RuleFor(n => n.Interaction)
            .GreaterThanOrEqualTo(0);
    }
}

public class EdgeImportValidator : AbstractValidator<EdgeImportDto>
{
    public EdgeImportValidator()
    {
        RuleFor(e => e.NodeTagA)
            .NotEmpty()
            .WithMessage("NodeTagA is required");

        RuleFor(e => e.NodeTagB)
            .NotEmpty()
            .WithMessage("NodeTagB is required");

        RuleFor(e => e)
            .Must(e => e.NodeTagA != e.NodeTagB)
            .WithMessage("Edge cannot connect a node to itself");
    }
}



internal class ImportGraphHanlder(IGraphRepository graphRepository, IUnitOfWork unitOfWork) :
 IRequestHandler<ImportGraphCommand, GraphDto>
{
    public async Task<GraphDto> Handle(ImportGraphCommand request, CancellationToken cancellationToken)
    {
        var graph = Graph.Create(request.Title);
        if(!string.IsNullOrEmpty(request.Description)) 
            graph.Description = request.Description;
        var nodes = new List<Node>();
        foreach(var nodeDto in request.Nodes)
        {
            var node = Graph.CreateNode(graph.Id,
                            nodeDto.Tag,
                            nodeDto.Activity,
                            nodeDto.Interaction);

            nodes.Add(node);
        }
        graph.AddNodes(nodes);
        await graphRepository.AddGraphAsync(graph);
        await unitOfWork.SaveChangesAsync(cancellationToken);
        //Performance issue
        /*
        foreach(var edge in request.Edges)
        {
            var nodeA= graph.GetNodeFromGraphByTag(edge.NodeTagA) ;
            var nodeB= graph.GetNodeFromGraphByTag(edge.NodeTagB) ;
            if(nodeA is null || nodeB is null) 
            throw new DomainException($"Node with Tag {edge.NodeTagA} or {edge.NodeTagB} not found or belongs to this graph"); 
            graph.ConnectNodes(nodeA, nodeB);
        }*/
        var nodeMap = graph.Nodes.ToDictionary(n => n.Tag);

        foreach (var edge in request.Edges)
        {
            if (!nodeMap.TryGetValue(edge.NodeTagA, out var nodeA) ||
                !nodeMap.TryGetValue(edge.NodeTagB, out var nodeB))
                throw new DomainException($"Node with Tag {edge.NodeTagA} or {edge.NodeTagB} not found");

            graph.ConnectNodes(nodeA, nodeB);
        }
        await unitOfWork.SaveChangesAsync(cancellationToken);
        var entity= await graphRepository.GetGraphByIdAsync(graph.Id,false)?? 
        throw new NotFoundException("Graph",graph.Id);
        var graphDto = new GraphDto(entity.Id, entity.Title, entity.Description!, entity.Order, entity.Size)
        {
            Nodes= entity.Nodes.ToList().Adapt<List<NodeDto>>(),
            Edges = entity.Edges.ToList().Adapt<List<EdgeDto>>()
        };
        return graphDto;
    }
}
