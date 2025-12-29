namespace sna_application.Analysis.Commands.AStar;

public record AStarRequest(AStarCommand Command);
public record AStarResponse(AStarResult Result);

public class AStarEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/analysis/astar/graphId={id:guid}",
        async ([FromRoute] Guid id, [FromBody] AStarRequest request, ISender sender) =>
        {
            var result = await sender.Send(request.Command);
            return Results.Ok(new AStarResponse(result));
        })
        .WithTags("Analysis")
        .WithName("AStarAlgo")
        .Produces<AStarResponse>();
    }
}
