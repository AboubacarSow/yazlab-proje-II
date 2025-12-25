namespace sna_application.Graphs.Commands.ImportGraphSnapshot;

public class ImportGraphSnapshotEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/graphs/import-snapshot",async (ImportGraphSnapshotCommand command,ISender sender) =>
        {
            var graph = await sender.Send(command);
            return Results.Ok(graph);
        }).WithTags("Graphs")
        .WithName("ImportGraphSnapshot");
    }
}