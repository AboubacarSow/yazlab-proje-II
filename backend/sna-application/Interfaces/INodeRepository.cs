using sna_data.Entities;

namespace sna_application.Interfaces;

public interface INodeRepository
{
    Task<Node?> GetByIdAsync(int id);
    Task<List<Node>> GetAllAsync();
    Task AddAsync(Node node);
    Task UpdateAsync(Node node);
    Task DeleteAsync(int id);
    Task<bool> ExistsByNameAsync(string name);
}
