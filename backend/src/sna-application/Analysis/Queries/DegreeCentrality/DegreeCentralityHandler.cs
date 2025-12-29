
namespace sna_application.Analysis.Queries.DegreeCentrality;

public record DegreeCentralityResult(Guid Id,
    int MaxDegree, 
    IReadOnlyDictionary<string, int> NodeDegrees,
    double ExecutionTime);
public record DegreeCentralityQuery(Guid GraphId) : IRequest<DegreeCentralityResult>;

internal class DegreeCentralityHandler(IGraphRepository graphRepository, ILogger<DegreeCentralityHandler> logger) 
    : IRequestHandler<DegreeCentralityQuery, DegreeCentralityResult>
{
    public async Task<DegreeCentralityResult> Handle(DegreeCentralityQuery request, CancellationToken cancellationToken)
    {
        var graph = await graphRepository.GetGraphByIdAsync(request.GraphId, false)
            ?? throw new NotFoundException($"Graph with Id {request.GraphId} not found");
        var timer = new Stopwatch();
        timer.Start();
        var degreeList = GraphAlgorithmService.KDegreeCentrality(graph, null);
        timer.Stop();
        logger.LogInformation("DegreeCentrality Alogrithm executed in:{Elapsed} ms",timer.Elapsed.TotalMilliseconds);
        var nodeDegrees= degreeList.ToDictionary(
            p=> p.Node.Id.ToString(),
            p=> p.Degree
        );

        var maxDegree= degreeList.Max(p=>p.Degree);
        return new DegreeCentralityResult(graph.Id,
                        maxDegree,
                        nodeDegrees,
                        timer.Elapsed.TotalMilliseconds);
    }
}
