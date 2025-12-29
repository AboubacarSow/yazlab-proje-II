namespace sna_application.Analysis.Queries.TopFiveNode;


public record TopFiveNodeInDegreeResponse(TopFiveNodeInDegreeResult Result);
public class TopFiveNodeInDegreEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/analysis/top-five-node/graphId={id:guid}",async (Guid id,ISender sender) =>
        {
            var result = await sender.Send(new TopFiveNodeInDegreeQuery(id));
            return Results.Ok(new TopFiveNodeInDegreeResponse(result));
            
        }).WithTags("Analysis")
        .WithName("GetTopFiveNodeInDegree")
        .Produces<TopFiveNodeInDegreeResponse>();
    }
}