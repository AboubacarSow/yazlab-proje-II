namespace sna_application.Graphs.Commands.CreateGraph;


public record CreateGraphRequest(CreateGraphCommand Graph);
public record CreateGraphResponse(string Message);
public class CreateGraphEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/graphs/", async(CreateGraphRequest request,ISender sender) =>
        {
            var (Id, Tag) = await sender.Send(request.Graph);
            return Results.Ok(new CreateGraphResponse($"Graph with Id:{Id} and Tag:{Tag} created"));
        }).WithTags("Graphs")
        .WithName("CreateGraph")
        .Produces<CreateGraphResponse>();
    }
}

