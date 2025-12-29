namespace sna_application.Analysis.Dijkstra;

public record DijkstraRequest(DijkstraCommand Command);
public record DijkstraResponse(DijkstraResult Result);

public class DijkstraEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/analysis/dijkstra/graphId={id:guid}",
        async ([FromRoute] Guid id, [FromBody] DijkstraRequest request, ISender sender) =>
        {
            var result = await sender.Send(request.Command);
            return Results.Ok(new DijkstraResponse(result));
        })
        .WithTags("Analysis")
        .WithName("DijkstraAlgo")
        .Produces<DijkstraResponse>();
    }
}
