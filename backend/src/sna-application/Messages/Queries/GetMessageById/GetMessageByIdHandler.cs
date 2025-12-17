using sna_domain.Exceptions;

namespace sna_application.Messages.Queries.GetMessageById;

public record GetMessageByIdQuery(Guid Id) : IRequest<MessageDto>;

internal class GetMessageByIdHandler(IMessageRepository _repo) :
 IRequestHandler<GetMessageByIdQuery, MessageDto>
{
    public async Task<MessageDto> Handle(GetMessageByIdQuery request, CancellationToken cancellationToken)
    {
        var entity = await _repo.GetOneMessageAsync(request.Id,false)
         ?? throw new NotFoundException("Message",request.ToString());
        var dto = entity.Adapt<MessageDto>();
        return dto;
    }
}
