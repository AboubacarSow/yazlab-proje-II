namespace sna_application.Messages.Queries.GetAllMessages;

public record GetMessagesQuery: IRequest<Result<List<MessageDto>>>;
internal class GetAllMessagesHandler(IMessageRepository _repository) :
IRequestHandler<GetMessagesQuery, Result<List<MessageDto>>>{
    public async Task<Result<List<MessageDto>>> Handle(GetMessagesQuery request, CancellationToken cancellationToken)
    {
        var entities= await _repository.GetAllMessagesAsync(false);
        var dtos= entities.Adapt<List<MessageDto>>();
        return Result.Create(dtos.ToList());
    }
}


