
using System.Security.Claims;

namespace sna_application.Graphs.Queries.GetGraphById;


public record GetGraphByIdResponse(GraphDto Graph);
public class GetGraphByIdEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/graphs/{id:guid}", async (Guid Id, ISender sender,ClaimsPrincipal claims) =>
        {
            var userId =new Guid(claims.FindFirst(ClaimTypes.NameIdentifier)?.Value!) ;
            var result = await sender.Send(new GetGraphByIdQuery(Id));
            if(result.OwnerId!=userId)
                return Results.Unauthorized();
            return Results.Ok(new GetGraphByIdResponse(result));
        }).WithTags("Graphs")
        .WithName("GetGraphById")
        .WithSummary("Retrives Graph by its identifier")
        .Produces<GetGraphByIdResponse>()
        .RequireAuthorization();
    }
}