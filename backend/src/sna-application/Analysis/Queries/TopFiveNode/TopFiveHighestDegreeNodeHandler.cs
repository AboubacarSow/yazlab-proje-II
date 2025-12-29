
using sna_application.Analysis.Dtos;

namespace sna_application.Analysis.Queries.TopFiveNode;

public record TopFiveNodeInDegreeResult(Guid Id,
    int MaxDegree,
    IReadOnlyList<NodeDegreeDto> Nodes,
    double ExecutionTime);
public record TopFiveNodeInDegreeQuery(Guid GraphId) : IRequest<TopFiveNodeInDegreeResult>;

internal class TopFiveNodeInDegreeHandler(IGraphRepository graphRepository, ILogger<TopFiveNodeInDegreeHandler> logger) 
    : IRequestHandler<TopFiveNodeInDegreeQuery, TopFiveNodeInDegreeResult>
{
    public async Task<TopFiveNodeInDegreeResult> Handle(TopFiveNodeInDegreeQuery request, CancellationToken cancellationToken)
    {
        var graph = await graphRepository.GetGraphByIdAsync(request.GraphId, false)
            ?? throw new NotFoundException($"Graph with Id {request.GraphId} not found");
        var timer = new Stopwatch();
        timer.Start();
        var degreeList = GraphAlgorithmService.KDegreeCentrality(graph, 5);
        timer.Stop();
        logger.LogInformation("Alogrithm executed in:{Elapsed} ms",timer.Elapsed.TotalMilliseconds);
        var nodeDtos = degreeList.Select
        (d => new NodeDegreeDto
                (d.Node.Id, 
                d.Node.Tag, 
                d.Degree,
                d.Node.NormalizedDegreeCentrality))
                .ToList();

        return new TopFiveNodeInDegreeResult(graph.Id,
                            nodeDtos.Max(n=>n.Degree),
                             nodeDtos,
                              timer.Elapsed.TotalMilliseconds);
    }
}
