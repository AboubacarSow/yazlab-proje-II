using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace sna_application.Graphs.Commands.ImportGraph;
public record ImportGraphRequest(ImportGraphCommand ImportGraph);
public record ImportGraphResponse(GraphDto Graph);
public class ImportGraphEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/graphs/import/", async (ImportGraphRequest request, ISender sender,
        ClaimsPrincipal claims) =>
        {
            var ownerId = claims.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if(ownerId==null)
                return Results.Unauthorized();
            request.ImportGraph.OwnerId=new Guid(ownerId);
            var result = await sender.Send(request.ImportGraph);
            return Results.Ok(new ImportGraphResponse(result));
        }).WithTags("Graphs")
        .WithName("ImportGraph")
        .Produces<ImportGraphResponse>()
        .RequireAuthorization();
    }
}