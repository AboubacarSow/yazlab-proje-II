
namespace sna_application.Messages.Commands.CreateMessage;


public record CreateMessageRequest(CreateMessageCommand Message);
public class CreateMessageEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/messages", async (CreateMessageRequest request, ISender sender) =>
        {
            var result = await sender.Send(request.Message);
            return Results.Created($"messages/{result}", request);
        }).WithTags("Messages")
        .WithName("CreateMessage");
    }
}