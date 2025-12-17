using sna_domain.Entities;

namespace sna_application.Messages.Queries.GetAllMessages;

public record GetMessagesQuery: IRequest<List<MessageDto>>;
internal class GetAllMessagesHandler(IMessageRepository _repository) :
IRequestHandler<GetMessagesQuery, List<MessageDto>>{
    public async Task<List<MessageDto>> Handle(GetMessagesQuery request, CancellationToken cancellationToken)
    {
        var entities= await _repository.GetAllMessagesAsync(false);
        var dtos= entities.Adapt<List<MessageDto>>();
        return dtos;
    }
}


