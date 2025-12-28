namespace sna_application.Graphs.Queries.GetAllGraphs;

public record GetAllGraphsResponse(List<GraphDto>? Graphs);

public class GetAllGraphsEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/graphs", async (ISender sender) =>
        {
            var result = await sender.Send(new GetAllGraphsQuery());
            return Results.Ok(new GetAllGraphsResponse(result));
        }).WithName("GetAllGraphsAsync")
        .WithTags("Graphs")
        .WithDescription("Retrieves all graphs")
        .Produces<GetAllGraphsResponse>();
    }
}
