namespace sna_application.Analysis.Queries.WelshPowell;
public record WelshPowellResult(Guid GraphId,
                    int ColorsUsed,
                    IReadOnlyDictionary<int, int> NodeWithColors,
                    double ExecutionTime);

public record WelshPowellQuery(Guid GraphId): IRequest<WelshPowellResult>;
internal class WelshPowellHandler(IGraphRepository graphRepository, ILogger<WelshPowellHandler> logger) 
: IRequestHandler<WelshPowellQuery, WelshPowellResult>
{
    public async Task<WelshPowellResult> Handle(WelshPowellQuery request, CancellationToken cancellationToken)
    {
        
        var graph = await graphRepository.GetGraphByIdAsync(request.GraphId, false)
        ?? throw new NotFoundException($"Graph with Id: {request.GraphId} not found");

        var timer = new Stopwatch();
        timer.Start();
        var coloringDictionnary = GraphAlgorithms.WelshPowell(graph);
        timer.Stop();
        logger.LogInformation("WelshPowell Algorith got executed in :{Elapsed} ms", timer.Elapsed.TotalMilliseconds);
        
        return new WelshPowellResult(
            GraphId:graph.Id,
            ColorsUsed:coloringDictionnary.Values.Max()+1,
            NodeWithColors:coloringDictionnary.ToDictionary(
                p=>p.Key.Id,
                p=>p.Value
            ),
            ExecutionTime:timer.Elapsed.TotalMilliseconds
        );

    }
}
