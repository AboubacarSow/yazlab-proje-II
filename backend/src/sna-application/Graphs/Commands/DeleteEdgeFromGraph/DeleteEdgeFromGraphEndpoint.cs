
using Microsoft.AspNetCore.Mvc;

namespace sna_application.Graphs.Commands.DeleteEdgeFromGraph;

public record DeleteEdgeFromGraphRequest(DeleteEdgeFromGraphCommand Edge);
public record DeleteEdgeFromGraphResponse(GraphDto Graph);
public class DeleteEdgeFromGraphEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/graphs/{graphId:guid}/edges/delete", 
        async ([FromRoute]Guid graphId,[FromBody]DeleteEdgeFromGraphRequest request, ISender sender) =>
        {
            if(graphId != request.Edge.GraphId) return Results.BadRequest("Ids mismatch");
            var result = await sender.Send(request.Edge);
            return Results.Ok(new DeleteEdgeFromGraphResponse(result));
        }).WithTags("Graphs.Edges")
        .WithName("DeleteEdgeFromGraph")
        .Produces<DeleteEdgeFromGraphResponse>();
    }
}