
namespace sna_application.Authentication.Commands.Login;

public record LoginRequest(LoginCommand Command);
public class LoginEndpoint: ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/auth/login",
        async (LoginRequest request, IMediator mediator) =>
        {
            var token = await mediator.Send(request.Command);
            return Results.Ok(token);
        })
        .WithName("Login")
        .WithTags("Authentication")
        .Produces<TokenContainer>(StatusCodes.Status200OK);
    }
}