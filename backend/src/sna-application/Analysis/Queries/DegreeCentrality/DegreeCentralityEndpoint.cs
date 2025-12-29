namespace sna_application.Analysis.Queries.DegreeCentrality;
public record DegreeCentralityResponse(DegreeCentralityResult Result);
public class DegreeCentralityEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/analysis/degree-centrality/graphId={id:guid}", 
        async ([FromRoute] Guid id, ISender sender) =>
        {
            var result = await sender.Send(new DegreeCentralityQuery(id));
            return Results.Ok(new DegreeCentralityResponse(result));
        })
        .WithTags("Analysis")
        .WithName("DegreeCentralityAlgo")
        .Produces<DegreeCentralityResponse>();
    }
}
