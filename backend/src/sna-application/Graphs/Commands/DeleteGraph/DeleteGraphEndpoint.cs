
using Microsoft.AspNetCore.Http.HttpResults;

namespace sna_application.Graphs.Commands.DeleteGraph;

public class DeleteGraphEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapDelete("api/graphs/{id:int}", async (int id,ISender sendere) =>
        {
            var result = await sendere.Send(new DeleteGraphCommand(id));
            if(!result) return Results.BadRequest($"An error occcured while deleting Graph with Id:{id}");
            return Results.NoContent();
        }).WithTags("Graphs")
        .WithName("DeleteGraph")
        .Produces<NoContent>();
    }
}