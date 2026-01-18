using Microsoft.AspNetCore.Identity;
using sna_application.Interfaces;

namespace sna_application.Authentication.Commands.Login;

public record LoginCommand(string UserName,string Password):IRequest<TokenContainer>;

public class LoginCommandValidator:AbstractValidator<LoginCommand>
{
    public LoginCommandValidator()
    {
        RuleFor(x=>x.UserName)
        .NotEmpty().WithMessage("UserName is required")
        .EmailAddress().WithMessage("UserName must be a valid email address");

        RuleFor(x=>x.Password)
        .NotEmpty().WithMessage("Password is required");
    }
}

public class LoginHandler(IJWTService jWTService, UserManager<ApplicationUser> userManager) : IRequestHandler<LoginCommand, TokenContainer>
{
    public async Task<TokenContainer> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByEmailAsync(request.UserName);
        var isPasswordValid = await userManager.CheckPasswordAsync(user!, request.Password);
        if(user is null || !isPasswordValid)
            throw new InvalidCredentialsException("Username or password is incorrect");
        var token = await jWTService.CreateTokenAsync(user!,true);
        return token;
    }
}
