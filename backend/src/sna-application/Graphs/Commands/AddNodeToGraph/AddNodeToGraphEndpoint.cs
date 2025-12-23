using Microsoft.AspNetCore.Mvc;

namespace sna_application.Graphs.Commands.AddNodeToGraph;


public record AddNodeToGraphRequest (AddNodeToGraphCommand Node);

public record AddNodeToGraphResponse(NodeDto nodeDto);
public class AddNodeToGraphEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/graphs/{id:guid}/nodes", async ([FromRoute]Guid id, [FromBody]AddNodeToGraphRequest request, ISender sender) =>
        {
            if(id!=request.Node.GraphId) return Results.BadRequest("Ids mismatch");
            var result = await sender.Send(request.Node);

            return Results.Ok(new AddNodeToGraphResponse(result));
        }).WithTags("Graphs.Nodes")
        .WithName("AddNodeToGraph")
        .Produces<AddNodeToGraphResponse>();
    }
}