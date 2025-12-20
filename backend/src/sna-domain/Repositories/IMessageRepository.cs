namespace sna_domain.Repositories;

public interface IMessageRepository
{
    Task<IEnumerable<Message>> GetAllMessagesAsync(bool trackChChanges);
    Task<Message?> GetOneMessageAsync(int Id, bool trackChChanges);
    Task AddMessageAsync(Message message);
    void DeleteMessage(Message message);
}
