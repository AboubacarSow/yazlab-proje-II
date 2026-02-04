using System.Security.Claims;

namespace sna_application.Graphs.Queries.GetAllGraphsByUser;
public record GetAllGraphsByUserResponse(List<GraphsDto>? Graphs);

public class GetAllGraphsByUserEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/graphs/userId={userId:guid}", async (Guid userId, ISender sender, ClaimsPrincipal claims) =>
        {
            var owner = claims.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if(owner==null) return Results.Unauthorized();
            
            var result = await sender.Send(new GetAllGraphsByUserQuery(userId));
            return Results.Ok(new GetAllGraphsByUserResponse(result));
        }).WithName("GetAllGraphsByUserAsync")
        .WithTags("Graphs/User")
        .WithDescription("Retrieves all graphs based on user")
        .Produces<GetAllGraphsByUserResponse>()
        .RequireAuthorization();
    }
}



