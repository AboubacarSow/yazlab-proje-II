using System.Security.Claims;

namespace sna_application.Graphs.Commands.ImportGraphSnapshot;

public class ImportGraphSnapshotEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/graphs/import-snapshot",async (ImportGraphSnapshotCommand command,ISender sender,
        ClaimsPrincipal claims) =>
        {
            var ownerId = claims.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if(ownerId==null)
                return Results.Unauthorized();
            command.OwnerId= new Guid(ownerId);
            var graph = await sender.Send(command);
            return Results.Ok(graph);
        }).WithTags("Graphs")
        .WithName("ImportGraphSnapshot")
        .RequireAuthorization();
    }
}