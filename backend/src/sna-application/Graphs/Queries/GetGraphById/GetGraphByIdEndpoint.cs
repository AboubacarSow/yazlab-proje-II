
namespace sna_application.Graphs.Queries.GetGraphById;


public record GetGraphByIdResponse(GraphDto Graph);
public class GetGraphByIdEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/graphs/{id:int}", async (int Id, ISender sender) =>
        {
            var result = await sender.Send(new GetGraphByIdQuery(Id));
            return Results.Ok(new GetGraphByIdResponse(result));
        }).WithTags("Graphs")
        .WithName("GetGraphById")
        .WithSummary("Retrives Graph by its identifier")
        .Produces<GetGraphByIdResponse>();
    }
}