
namespace sna_application.Graphs.Queries.GetGraphSummary;


public record GetGraphSummaryResponse(GraphSummary GraphSummary);
public class GetGraphSummaryEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/graphs/{id:guid}/summary", async(Guid id, ISender sender) =>
        {
            var result = await sender.Send(new GetGraphSummaryCommand(id));
            return Results.Ok(new GetGraphSummaryResponse(result));
        }).WithTags("Graphs")
        .WithName("GetGraphSummary")
        .Produces<GetGraphSummaryResponse>();
    }
}