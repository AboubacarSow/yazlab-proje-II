using sna_data.Entities;

namespace sna_application.Interfaces;

public interface IEdgeRepository
{
    Task<Edge?> GetByIdAsync(int id);
    Task<List<Edge>> GetAllAsync();
    Task<List<Edge>> GetByNodeIdAsync(int nodeId);
    Task AddAsync(Edge edge);
    Task DeleteAsync(int id);
    Task<bool> ExistsAsync(int sourceNodeId, int targetNodeId);
    Task<bool> NodesExistAsync(int sourceNodeId, int targetNodeId);
}
