
namespace sna_infrastructure.Persistence.Repositories;

internal class MessageRepository(GraphVDbContext context) 
    : RepositoryBase<Message>(context), IMessageRepository
{
    public async Task AddMessageAsync(Message message) => await Create(message);
    public void DeleteMessage(Message message) => Delete(message);
    public async Task<IEnumerable<Message>> GetAllMessagesAsync(bool trackChChanges)
            => await GetAllAsync(trackChChanges);
    public async Task<Message?> GetOneMessageAsync(Guid Id, bool trackChChanges)
        =>  await GetOneByIdAsync(m=>m.Id==Id,trackChChanges);
}
