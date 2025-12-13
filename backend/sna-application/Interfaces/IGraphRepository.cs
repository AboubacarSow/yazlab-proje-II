using sna_data.Entities;

namespace sna_application.Interfaces;

public interface IGraphRepository
{
    Task<GraphData?> GetByIdAsync(int id);
    Task<List<GraphData>> GetAllAsync();
    Task AddAsync(GraphData graph);
    Task UpdateAsync(GraphData graph);
    Task DeleteAsync(int id);
}
