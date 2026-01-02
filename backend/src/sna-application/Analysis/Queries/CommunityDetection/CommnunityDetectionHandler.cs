
namespace sna_application.Analysis.Queries.CommunityDetection;

public record CommunityDetectionResult(
    Guid GraphId,
    IReadOnlyDictionary<string, int> NodeToCommunity,
    int CommunityCount,
    double ExecutionTime
);

public record CommunityDetectionQuery(Guid Id): IRequest<CommunityDetectionResult>;

internal class CommunityDetectionHandler(IGraphRepository graphRepository,
ILogger<CommunityDetectionHandler> logger) :
IRequestHandler<CommunityDetectionQuery, CommunityDetectionResult>
{
    public async Task<CommunityDetectionResult> Handle(CommunityDetectionQuery request, CancellationToken cancellationToken)
    {
        var graph = await graphRepository.GetGraphByIdAsync(
            request.Id,
            false) ?? throw new NotFoundException($"Graph {request.Id} not found");

        var stopwatch = Stopwatch.StartNew();
        var nodeLabels = GraphAlgorithms.DetecteCommunity(graph);
        stopwatch.Stop();

        var nodeToCommunity = nodeLabels.ToDictionary(
            kvp => kvp.Key.Id.ToString(),
            kvp => kvp.Value
        );

        var communityCount = nodeToCommunity.Values.Distinct().Count();

        logger.LogInformation(
            "Community detection executed in {Elapsed} ms. Communities: {Count}",
            stopwatch.Elapsed.TotalMilliseconds,
            communityCount
        );

        return new CommunityDetectionResult(
            graph.Id,
            nodeToCommunity,
            communityCount,
            stopwatch.Elapsed.TotalMilliseconds
        );
    }
}
