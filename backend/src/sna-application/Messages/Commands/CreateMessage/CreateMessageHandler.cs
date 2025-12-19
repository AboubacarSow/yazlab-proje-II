using sna_domain.Entities;

namespace sna_application.Messages.Commands.CreateMessage;

public record CreateMessageCommand( 
    string FullName ,
    string Email,
    string Phone,
    string Content
): IRequest<int>;

public class CreateMessageValidator : AbstractValidator<CreateMessageCommand>
{
    public CreateMessageValidator()
    {
        RuleFor(c=>c.FullName)
        .NotEmpty()
        .WithMessage("FullName is required");

        RuleFor(m=>m.Email)
        .EmailAddress()
        .WithMessage("Email is not a valid email address required");

        RuleFor(m=> m.Phone)
        .NotEmpty()
        .WithMessage("Phone Number is required");

        RuleFor(m=> m.Content)
        .MinimumLength(50)
        .MaximumLength(1000)
        .WithMessage("Your message must be at the range of 50 - 1000 characters");
        
    }
}

public class CreateMessageHandler(IMessageRepository _repos, IUnitOfWork _unitOfWork)
: IRequestHandler<CreateMessageCommand, int>
{
    public async Task<int> Handle(CreateMessageCommand request, CancellationToken cancellationToken)
    {
        var message = new Message
        {
            FullName = request.FullName,
            Email = request.Email,
            Phone = request.Phone,
            Content = request.Content
        };
        await _repos.AddMessageAsync(message);
       await _unitOfWork.SaveChangesAsync(cancellationToken);
       
        return message.Id;
    }
}
