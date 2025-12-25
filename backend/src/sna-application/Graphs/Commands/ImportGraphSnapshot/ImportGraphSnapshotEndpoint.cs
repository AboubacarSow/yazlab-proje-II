namespace sna_application.Graphs.Commands.ImportGraphSnapshot;

public class ImportGraphSnapshotEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/graphs/import-snapshot",async (ImportGraphSnapshotCommand command,ISender sender) =>
        {
            var graphId = await sender.Send(command);
            return Results.Created($"/api/graphs/{graphId}", graphId);
        }).WithTags("Graphs")
        .WithName("ImportGraphSnapshot");
    }
}