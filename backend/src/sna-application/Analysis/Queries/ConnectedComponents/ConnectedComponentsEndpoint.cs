namespace sna_application.Analysis.Queries.ConnectedComponents;

public record ConnectedComponentsResponse(ConnectedComponentsResult Result);
public class ConnectedComponentsEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/analysis/connected-components/graphId={id:guid}", 
        async (Guid id, ISender sender) =>
        {
            var result = await sender.Send(new ConnectedComponentsQuery(id));
            return Results.Ok(new ConnectedComponentsResponse(result));
        })
        .WithTags("Analysis")
        .WithName("ConnectedComponents")
        .Produces<ConnectedComponentsResponse>();
    }
}


