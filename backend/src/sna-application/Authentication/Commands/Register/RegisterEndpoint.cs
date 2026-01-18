namespace sna_application.Authentication.Commands.Register;
public record RegisterRequest(RegisterCommand Command);
public class RegisterEndpoint: ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/authentication/register",
        async (RegisterRequest request, IMediator mediator) =>
        {
            var isRegistered = await mediator.Send(request.Command);
            if(!isRegistered)
                return Results.Conflict("User with the provided email already exists.");
            return Results.Ok("User registered successfully.");
        })
        .WithName("Register")
        .WithTags("Authentication")
        .Produces<string>(StatusCodes.Status200OK)
        .Produces<string>(StatusCodes.Status409Conflict);
    }
}