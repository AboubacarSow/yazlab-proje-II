using Microsoft.AspNetCore.Http.HttpResults;

namespace sna_application.Graphs.Commands.ClearGraph;

public class ClearGraphEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapDelete("api/graphs/clear/{id:guid}", async (Guid id,ISender sendere) =>
        {
            var result = await sendere.Send(new ClearGraphCommand(id));
            return Results.Ok(result);
        }).WithTags("Graphs")
        .WithName("ClearGraph")
        .Produces<GraphDto>();
    }
}