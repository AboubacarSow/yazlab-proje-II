namespace sna_application.Analysis.Queries.WelshPowell;

public record WelshPowellResponse(WelshPowellResult Result);
public class WelshPowellEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/analysis/coloring/graphId={id:guid}", async (Guid id, ISender sender) =>
        {
            var result = await sender.Send(new WelshPowellQuery(id));

            return Results.Ok(new WelshPowellResponse(result));
        }).WithTags("Analysis")
        .WithName("ColoringGraphNodes")
        .Produces<WelshPowellResponse>();
    }
}