using Microsoft.AspNetCore.Mvc;

namespace sna_application.Graphs.Commands.AddEdgeToGraph;

public record AddEdgeToGraphRequest(AddEdgeToGraphCommand Edge);
public record AddEdgeToGraphResponse(bool IsSuccess, EdgeDto Edge);
public class AddEdgeToGraphEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/graphs/{id:guid}/edges", async([FromRoute]Guid id,[FromBody]AddEdgeToGraphRequest request, ISender sender) =>
        {
            if(id!= request.Edge.GraphId) return Results.BadRequest("Mismatch Ids");
            var result= await sender.Send(request.Edge);
            return Results.Ok(new AddEdgeToGraphResponse(true,result));
        }).WithTags("Graphs.Edges")
        .WithName("AddEdgeToGraph")
        .Produces<AddEdgeToGraphResponse>();
    }
}