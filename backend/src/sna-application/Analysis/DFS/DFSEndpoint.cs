namespace sna_application.Analysis.DFS;

public record DFSRequest(DFSCommand Command);
public record DFSResponse(DFSResult Result);

public class DFSEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/analysis/dfs/graphId={id:guid}", 
        async ([FromRoute] Guid id, [FromBody] DFSRequest request, ISender sender) =>
        {
            var result = await sender.Send(request.Command);
            return Results.Ok(new DFSResponse(result));
        })
        .WithTags("Analysis")
        .WithName("DFSAlgo")
        .Produces<DFSResponse>();
    }
}
