namespace sna_application.Analysis.Dijkstra;

public record DijkstraResult(Guid Id, IReadOnlyList<NodeDto> Nodes, double ExecutionTime);
public record DijkstraCommand(Guid GraphId, int StartNodeId, int TargetNodeId) : IRequest<DijkstraResult>;

internal class DijkstraHandler(IGraphRepository graphRepository, ILogger<DijkstraHandler> logger)
    : IRequestHandler<DijkstraCommand, DijkstraResult>
{
    public async Task<DijkstraResult> Handle(DijkstraCommand request, CancellationToken cancellationToken)
    {
        var graph = await graphRepository.GetGraphByIdAsync(request.GraphId, false)
            ?? throw new NotFoundException($"Graph with Id {request.GraphId} not found");
        var startNode = graph.GetNodeFromGraphById(request.StartNodeId)
            ?? throw new NotFoundException($"Node: {request.StartNodeId}", graph.Title);
        var targetNode = graph.GetNodeFromGraphById(request.TargetNodeId)
            ?? throw new NotFoundException($"Node: {request.TargetNodeId}", graph.Title);
            
        var timer = new Stopwatch();
        timer.Start();
        var path = GraphAlgorithmService.Dijkstra(graph, startNode, targetNode);
        timer.Stop();
        logger.LogInformation("Dijkstra Algorithm executed in : {Elapsed} ms", timer.Elapsed.TotalMilliseconds);
        var nodeDtos = path.Adapt<IReadOnlyList<NodeDto>>();
        return new DijkstraResult(request.GraphId, nodeDtos, timer.Elapsed.TotalMilliseconds);
    }
}
