

namespace sna_application.Analysis.Commands.AStar;

public record AStarResult(Guid Id, IReadOnlyList<NodeDto> Nodes, double ExecutionTime);
public record AStarCommand(Guid GraphId, int StartNodeId, int TargetNodeId) : IRequest<AStarResult>;

internal class AStarHandler(IGraphRepository graphRepository, ILogger<AStarHandler> logger)
    : IRequestHandler<AStarCommand, AStarResult>
{
    public async Task<AStarResult> Handle(AStarCommand request, CancellationToken cancellationToken)
    {
        var graph = await graphRepository.GetGraphByIdAsync(request.GraphId, false)
            ?? throw new NotFoundException($"Graph with Id {request.GraphId} not found");
        var startNode = graph.GetNodeFromGraphById(request.StartNodeId)
            ?? throw new NotFoundException($"Node: {request.StartNodeId}", graph.Title);
        var targetNode = graph.GetNodeFromGraphById(request.TargetNodeId)
            ?? throw new NotFoundException($"Node: {request.TargetNodeId}", graph.Title);
        var timer = new Stopwatch();
        timer.Start();
        var path = GraphAlgorithmService.AStar(graph, startNode, targetNode);
        timer.Stop();
        logger.LogInformation("AStar Algorithm executed in : {Elapsed} ms", timer.ElapsedMilliseconds);
        var nodeDtos = path.Adapt<IReadOnlyList<NodeDto>>();
        return new AStarResult(request.GraphId, nodeDtos, timer.ElapsedMilliseconds);
    }
}