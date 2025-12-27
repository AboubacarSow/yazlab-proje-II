

using Microsoft.AspNetCore.Mvc;

namespace sna_application.Graphs.Commands.EditGraph;


public record EditGraphRequest(EditGraphCommand Graph);

public record EditGraphResponse(string Title, string Description);
public class EditGraphEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut("api/graphs/{id:guid}", async ([FromRoute] Guid id, [FromBody] EditGraphRequest request, ISender sender) =>
        {
            if (id != request.Graph.Id) return Results.BadRequest("Ids mismatch");
            var result = await sender.Send(request.Graph);

            return !result ? 
                    Results.BadRequest("An error occured") 
                    : Results.Ok(new EditGraphResponse(request.Graph.Title, request.Graph.Description));
        }).WithTags("Graphs")
        .WithName("EditGraph")
        .Produces<EditGraphResponse>();
    }
}