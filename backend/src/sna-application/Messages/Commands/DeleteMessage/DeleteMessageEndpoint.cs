using Microsoft.AspNetCore.Http.HttpResults;

namespace sna_application.Messages.Commands.DeleteMessage;
public class DeleteMessageEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapDelete("api/messages/{id:int}", async (int id, ISender send) =>
        {
            var result = await send.Send(new DeleteMessageCommand(id));

            if(!result) return Results.BadRequest($"Failed to delete message with id:{id}");
            return Results.NoContent();
        }).WithTags("Messages")
        .WithName("DeleteMessage")
        .Produces<NoContent>();
    }
}