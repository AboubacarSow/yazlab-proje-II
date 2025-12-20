
namespace sna_application.Messages.Commands.DeleteMessage;



public record DeleteMessageCommand(int Id): IRequest<bool>;
internal class DeleteMessageHandler(IMessageRepository _repository, IUnitOfWork _unitOfWork) : IRequestHandler<DeleteMessageCommand, bool>
{
    public async Task<bool> Handle(DeleteMessageCommand request, CancellationToken cancellationToken)
    {
        var entity = await _repository.GetOneMessageAsync(request.Id,false) ??
        throw new NotFoundException("Message",request.Id.ToString());
         _repository.DeleteMessage(entity);
         return await _unitOfWork.SaveChangesAsync(cancellationToken);
    }
}
