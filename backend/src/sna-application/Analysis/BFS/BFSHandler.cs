

namespace sna_application.Analysis.BFS;


public record BFSResult(
    Guid Id,
    IReadOnlyList<NodeDto> Nodes,
    double ExecutionTime);
public record BFSCommand(Guid GraphId, int StartNodeId): IRequest<BFSResult>;
internal class BFSHandler(IGraphRepository graphRepository, ILogger<BFSHandler> logger) : IRequestHandler<BFSCommand, BFSResult>
{
    public async Task<BFSResult> Handle(BFSCommand request, CancellationToken cancellationToken)
    {
        var graph = await graphRepository.GetGraphByIdAsync(request.GraphId, false)
            ?? throw new NotFoundException($"Graph with Id {request.GraphId} not found");
        var node = graph.GetNodeFromGraphById(request.StartNodeId) ?? 
         throw new NotFoundException($"Node: {request.StartNodeId}", graph.Title);
        var timer = new Stopwatch();
        //Algorithm starts
        timer.Start();
        var visitedNodes = GraphAlgorithmService.BFS(graph, node,visited:[]);
        timer.Stop();
        //Algorithm ends
        logger.LogInformation("BFS Algorithm executed in : {Elapsed} ms", timer.ElapsedMilliseconds);
        var nodeDtos = visitedNodes.Adapt<IReadOnlyList<NodeDto>>();
        return new BFSResult(request.GraphId,nodeDtos,timer.ElapsedMilliseconds);
    }
}




