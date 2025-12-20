
using Microsoft.AspNetCore.Mvc;

namespace sna_application.Graphs.Commands.DeleteEdgeFromGraph;

public record DeleteEdgeFromGraphRequest(DeleteEdgeFromGraphCommand Edge);
public class DeleteEdgeFromGraphEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapDelete("api/graphs/{graphId:int}/edges", 
        async ([FromRoute]int graphId,[FromBody]DeleteEdgeFromGraphRequest request, ISender sender) =>
        {
            if(graphId != request.Edge.GraphId) return Results.BadRequest("Ids mismatch");
            var result = await sender.Send(request.Edge);
            return !result ? 
                    Results.BadRequest("Error occured while attempting to delete edge"):
                    Results.NoContent();
        }).WithTags("Graphs.Edges")
        .WithName("DeleteEdgeFromGraph");
    }
}