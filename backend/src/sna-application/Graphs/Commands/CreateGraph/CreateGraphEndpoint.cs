namespace sna_application.Graphs.Commands.CreateGraph;


public record CreateGraphRequest(CreateGraphCommand Graph);
public record CreateGraphResponse(Guid Id, string Title);
public class CreateGraphEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/graphs/", async(CreateGraphRequest request,ISender sender) =>
        {
            var (Id, Title) = await sender.Send(request.Graph);
            return Results.Ok(new CreateGraphResponse(Id,Title));
        }).WithTags("Graphs")
        .WithName("CreateGraph")
        .Produces<CreateGraphResponse>();
    }
}
