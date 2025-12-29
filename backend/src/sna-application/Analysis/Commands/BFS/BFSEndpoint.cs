
namespace sna_application.Analysis.Commands.BFS;

public record BFSRequest(BFSCommand Command);
public record BFSResponse(BFSResult Result);

public class BFSEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/analysis/bfs/graphId={id:guid}", 
        async([FromRoute]Guid id, [FromBody]BFSRequest request, ISender sender) =>
        {
            var result = await sender.Send(request.Command);
            return Results.Ok(new BFSResponse(result));

        }).WithTags("Analysis")
        .WithName("BFSAlgo")
        .Produces<BFSResponse>();
    }
}