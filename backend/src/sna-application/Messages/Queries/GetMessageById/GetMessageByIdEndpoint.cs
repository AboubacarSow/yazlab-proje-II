namespace sna_application.Messages.Queries.GetMessageById;


public record GetMessageByIdResponse(MessageDto Message);

public class GetMessageByIdEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/messages/{id:int}", async ( int id, ISender sender) =>
        {
            var result = await sender.Send(new GetMessageByIdQuery(id));
            return Results.Ok(new GetMessageByIdResponse(result));
        }).WithTags("Messages")
        .WithName("GetMessageById")
        .Produces<GetMessageByIdResponse>()
        .WithDescription("Retrieves message by its identifier");
    }
}