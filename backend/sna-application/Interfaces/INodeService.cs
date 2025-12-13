using sna_data.Entities;

namespace sna_application.Interfaces;

public interface INodeService
{
    Task<Node?> GetByIdAsync(int id);
    Task<List<Node>> GetAllAsync();
    Task<Node> CreateAsync(Node node);
    Task UpdateAsync(int id, Node node);
    Task DeleteAsync(int id);
}
