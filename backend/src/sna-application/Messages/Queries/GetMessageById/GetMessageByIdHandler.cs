namespace sna_application.Messages.Queries.GetMessageById;

public record GetMessageByIdQuery(Guid Id) : IRequest<Result<MessageDto>>;

internal class GetMessageByIdHandler(IMessageRepository _repo) : IRequestHandler<GetMessageByIdQuery, Result<MessageDto>>
{
    public async Task<Result<MessageDto>> Handle(GetMessageByIdQuery request, CancellationToken cancellationToken)
    {
        var entity = await _repo.GetOneMessageAsync(request.Id,false);
        var dto = entity.Adapt<MessageDto>();
        return Result.Create(dto);
    }
}
