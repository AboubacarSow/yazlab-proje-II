using sna_data.Entities;

namespace sna_application.Interfaces;

public interface IEdgeService
{
    Task<Edge?> GetByIdAsync(int id);
    Task<List<Edge>> GetAllAsync();
    Task<List<Edge>> GetByNodeIdAsync(int nodeId);
    Task<Edge> CreateAsync(int sourceNodeId, int targetNodeId, int? interactionCount = null);
    Task DeleteAsync(int id);
}
