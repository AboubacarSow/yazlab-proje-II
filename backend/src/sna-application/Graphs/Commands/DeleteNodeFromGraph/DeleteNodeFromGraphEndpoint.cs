
namespace sna_application.Graphs.Commands.DeleteNodeFromGraph;

public record DeleteNodeFromGraphResponse(GraphDto Result);
public class DeleteNodeFromGraphEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapDelete("api/graphs/{graphId:guid}/nodes/{id:int}", async([FromRoute] Guid graphId, [FromRoute]int id, ISender sender) =>
        {
            var result = await sender.Send(new DeleteNodeFromGraphCommand(graphId,id));
           return Results.Ok(new DeleteNodeFromGraphResponse(result));
      
        }).WithTags("Graphs.Nodes")
        .WithName("DeleteNodeFromGraph")
        .Produces<DeleteNodeFromGraphResponse>();
    }
}