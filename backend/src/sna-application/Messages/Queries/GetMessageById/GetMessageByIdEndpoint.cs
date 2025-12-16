namespace sna_application.Messages.Queries.GetMessageById;


public record GetMessageByIdResponse(MessageDto Message);

public class GetMessageByIdEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/messages/{id:guid}", async ( Guid id, ISender sender) =>
        {
            var result = await sender.Send(new GetMessageByIdQuery(id));
            if (result.IsFailure) return Results.NotFound();
            return Results.Ok(new GetMessageByIdResponse(result.Value));
        }).WithTags("Messages")
        .WithName("GetMessageById")
        .Produces<GetMessageByIdResponse>()
        .WithDescription("Retrieves message by its identifier");
    }
}