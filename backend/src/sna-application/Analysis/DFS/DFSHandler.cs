using System.Diagnostics;

namespace sna_application.Analysis.DFS;

public record DFSResult(Guid Id, IReadOnlyList<NodeDto> Nodes, double ExecutionTime);
public record DFSCommand(Guid GraphId, int StartNodeId) : IRequest<DFSResult>;

internal class DFSHandler(IGraphRepository graphRepository, ILogger<DFSHandler> logger) 
    : IRequestHandler<DFSCommand, DFSResult>
{
    public async Task<DFSResult> Handle(DFSCommand request, CancellationToken cancellationToken)
    {
        var graph = await graphRepository.GetGraphByIdAsync(request.GraphId, false)
            ?? throw new NotFoundException($"Graph with Id {request.GraphId} not found");

        var node = graph.GetNodeFromGraphById(request.StartNodeId)
            ?? throw new NotFoundException($"Node: {request.StartNodeId}", graph.Title);

        var timer = Stopwatch.StartNew();
        logger.LogInformation("DFS Algorithm executed in : {Elapsed} ms", timer.ElapsedMilliseconds);
        var visitedNodes = GraphAlgorithmService.DFS(graph, node, visited: []);
        timer.Stop();
        var nodeDtos = visitedNodes.Adapt<IReadOnlyList<NodeDto>>();
        return new DFSResult(request.GraphId, nodeDtos, timer.ElapsedMilliseconds);
    }
}

