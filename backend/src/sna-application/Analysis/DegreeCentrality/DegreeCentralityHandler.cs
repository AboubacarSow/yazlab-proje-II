
using sna_application.Analysis.Dtos;

namespace sna_application.Analysis.DegreeCentrality;

public record DegreeCentralityResult(Guid Id, IReadOnlyList<NodeDegreeDto> Nodes, double ExecutionTime);
public record DegreeCentralityCommand(Guid GraphId) : IRequest<DegreeCentralityResult>;

internal class DegreeCentralityHandler(IGraphRepository graphRepository, ILogger<DegreeCentralityHandler> logger) 
    : IRequestHandler<DegreeCentralityCommand, DegreeCentralityResult>
{
    public async Task<DegreeCentralityResult> Handle(DegreeCentralityCommand request, CancellationToken cancellationToken)
    {
        var graph = await graphRepository.GetGraphByIdAsync(request.GraphId, false)
            ?? throw new NotFoundException($"Graph with Id {request.GraphId} not found");
        var timer = new Stopwatch();
        timer.Start();
        var degreeList = GraphAlgorithmService.KDegreeCentrality(graph, null);
        timer.Stop();
        logger.LogInformation("DegreeCentrality Alogrithm executed in:{Elapsed} ms",timer.Elapsed.TotalMilliseconds);
        var nodeDtos = degreeList.Select(d => new NodeDegreeDto(d.Node.Id, d.Node.Tag, d.Degree)).ToList();
        return new DegreeCentralityResult(graph.Id, nodeDtos, timer.Elapsed.TotalMilliseconds);
    }
}
