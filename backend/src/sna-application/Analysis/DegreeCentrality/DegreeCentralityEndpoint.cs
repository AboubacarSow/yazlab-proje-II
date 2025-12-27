namespace sna_application.Analysis.DegreeCentrality;
public record DegreeCentralityRequest(DegreeCentralityCommand Command);
public record DegreeCentralityResponse(DegreeCentralityResult Result);

public class DegreeCentralityEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/analysis/degree/graphId={id:guid}", 
        async ([FromRoute] Guid id, [FromBody] DegreeCentralityRequest request, ISender sender) =>
        {
            var result = await sender.Send(request.Command);
            return Results.Ok(new DegreeCentralityResponse(result));
        })
        .WithTags("Analysis")
        .WithName("DegreeCentralityAlgo")
        .Produces<DegreeCentralityResponse>();
    }
}
