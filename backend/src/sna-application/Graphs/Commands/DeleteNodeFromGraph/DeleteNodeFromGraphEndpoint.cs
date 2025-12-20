
using Microsoft.AspNetCore.Mvc;

namespace sna_application.Graphs.Commands.DeleteNodeFromGraph;

public class DeleteNodeFromGraphEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/graphs/{graphId:int}/nodes/{id:int}", async([FromRoute] int graphId, [FromRoute]int id, ISender sender) =>
        {
            var result = await sender.Send(new DeleteNodeFromGraphCommand(graphId,id));
           return !result?
            Results.BadRequest("An error occured whilte attempting to delete this node"):
            Results.NoContent();
        }).WithTags("Graphs.Nodes")
        .WithName("DeleteNodeFromGraph");
    }
}