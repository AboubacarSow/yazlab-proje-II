using sna_data.Entities;

namespace sna_application.Interfaces;

public interface IGraphService
{
    Task<GraphData?> GetByIdAsync(int id);
    Task<List<GraphData>> GetAllAsync();
    Task<GraphData> CreateAsync(GraphData graph);
    Task UpdateAsync(int id, GraphData graph);
    Task DeleteAsync(int id);
}
