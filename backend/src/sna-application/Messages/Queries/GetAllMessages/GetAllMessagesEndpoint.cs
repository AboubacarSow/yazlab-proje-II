namespace sna_application.Messages.Queries.GetAllMessages;

public record GetAllMessagesResponse(List<MessageDto>? Messages);
public class GetAllMessagesEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/messages", async(ISender sender) =>
        {
            var result = await sender.Send(new GetMessagesQuery());
            var response= new GetAllMessagesResponse(result.Value!);
            return Results.Ok(response);
        }).WithName("GetMessages")
        .WithTags("Messages")
        .WithDescription("Retrieves all messages")
        .Produces<GetAllMessagesResponse>();
    }
}