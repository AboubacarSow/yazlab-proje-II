
namespace sna_application.Analysis.Queries.CommunityDetection;

public class CommunityDetectionEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/analysis/community-detection/graphId={id:guid}", async(Guid id,ISender sender) =>
        {
            var result = await sender.Send(new CommunityDetectionQuery(id));
            return Results.Ok(result);
            
        }).WithTags("Analysis")
        .WithName("CommunityDetection");
    }
}