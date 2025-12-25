
namespace sna_application.Graphs.Queries.ExportGraph;


public record ExportGraphResponse(ExportGraphDto Graph);
public class ExportGraphEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/graphs/{id:guid}/export", async (Guid id, ISender sender) =>
        {
            var result = await sender.Send(new ExportGraphCommand(id));
            return Results.Ok(new ExportGraphResponse(result));
        }).WithTags("Graphs")
        .WithName("ExportGraph")
        .Produces<ExportGraphResponse>();
    }
}