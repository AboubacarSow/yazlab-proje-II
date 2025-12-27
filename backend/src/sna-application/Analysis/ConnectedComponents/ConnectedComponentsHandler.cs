using sna_application.Analysis.Dtos;

namespace sna_application.Analysis.ConnectedComponents;

public record ConnectedComponentsResult(Guid GraphId, IReadOnlyList<ComponentDto> Components);

public record ConnectedComponentsQuery(Guid GraphId) : IRequest<ConnectedComponentsResult>;

internal class ConnectedComponentsHandler(
    IGraphRepository graphRepository, 
    ILogger<ConnectedComponentsHandler> logger
) : IRequestHandler<ConnectedComponentsQuery, ConnectedComponentsResult>
{
    public async Task<ConnectedComponentsResult> Handle(ConnectedComponentsQuery request, CancellationToken cancellationToken)
    {
        var graph = await graphRepository.GetGraphByIdAsync(request.GraphId, false)
            ?? throw new NotFoundException($"Graph with Id {request.GraphId} not found");

        var timer = new Stopwatch();
        timer.Start();
        var components = GraphAlgorithmService.GetConnectedComponents(graph);
        timer.Stop();
        logger.LogInformation("Detection of Connected Components Algorithm executed in:{Elapsed} ms",timer.ElapsedMilliseconds);
        var componentsDto = components
            .Select((nodes, idx) => new ComponentDto(
                Id: idx + 1, 
                Nodes: nodes.Adapt<IReadOnlyList<NodeDto>>()
            ))
            .ToList();

        return new ConnectedComponentsResult(graph.Id, componentsDto);
    }
}



