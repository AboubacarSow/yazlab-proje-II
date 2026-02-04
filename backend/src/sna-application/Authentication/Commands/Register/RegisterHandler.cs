using Microsoft.AspNetCore.Identity;

namespace sna_application.Authentication.Commands.Register;
public record RegisterCommand(string FirstName,
    string LastName,
    string PhoneNumber,
    string Email,
    string Password,
    string ConfirmPassword):IRequest<bool>;
public class RegisterCommandValidator : AbstractValidator<RegisterCommand>
{
    public RegisterCommandValidator()
    {
        RuleFor(x=>x.FirstName)
        .NotEmpty().WithMessage("FirstName is required")
        .MaximumLength(50).WithMessage("FirstName must not exceed 50 characters");

        RuleFor(x=>x.LastName)
        .NotEmpty().WithMessage("LastName is required")
        .MaximumLength(50).WithMessage("LastName must not exceed 50 characters");

        RuleFor(x=>x.PhoneNumber)
        .NotEmpty().WithMessage("PhoneNumber is required")
        .Matches(@"^\+?[1-9]\d{1,14}$").WithMessage("PhoneNumber is not valid");

        RuleFor(x=>x.Email)
        .NotEmpty().WithMessage("Email is required")
        .EmailAddress().WithMessage("Email is not valid");

        RuleFor(x=>x.Password)
        .NotEmpty().WithMessage("Password is required")
        .MinimumLength(6).WithMessage("Password must be at least 6 characters long");

        RuleFor(x=>x.ConfirmPassword)
        .Equal(x=>x.Password).WithMessage("ConfirmPassword must match Password");
    }
}


public class RegisterHandler(UserManager<ApplicationUser> userManager) : IRequestHandler<RegisterCommand, bool>
{
    public async Task<bool> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        var existingUser = await userManager.FindByEmailAsync(request.Email);
        if(existingUser is not null)
            return false;

        var newUser = new ApplicationUser(
            firstname:request.FirstName,
            lastname:request.LastName,
            phonenumber:request.PhoneNumber,
            email:request.Email
        );

        var result = await userManager.CreateAsync(newUser, request.Password);

        
        return result.Succeeded;
    }
}
