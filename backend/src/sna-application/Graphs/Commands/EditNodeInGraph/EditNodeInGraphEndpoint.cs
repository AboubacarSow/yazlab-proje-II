
using Microsoft.AspNetCore.Mvc;

namespace sna_application.Graphs.Commands.EditNodeInGraph;

public record EditNodeInGraphRequest(EditNodeInGraphCommand Vertex);
public record EditNodeInGraphResponse(NodeDto Node);
public class EditNodeInGraphEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut("api/graphs/{graphId:guid}/nodes/{id}", 
        async([FromRoute] Guid graphId,[FromRoute] int id, EditNodeInGraphRequest request, ISender sender) =>
        {
            if(graphId!= request.Vertex.GraphId) return Results.BadRequest("GraphIds mismatch");
            if(id!= request.Vertex.Id) return Results.BadRequest("NodeIds mismatch");

            var (node,isSuccess) = await sender.Send(request.Vertex);
            if(!isSuccess) 
                return Results.BadRequest($"An error occured while attempting to edit Node with Id:{id}");
            return Results.Ok(new EditNodeInGraphResponse(node));
            
        }).WithTags("Graphs.Nodes")
        .WithName("EditNodeInGraph")
        .Produces<EditNodeInGraphResponse>();
        
    }

  
}