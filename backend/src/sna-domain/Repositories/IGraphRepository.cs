using sna_domain.Entities;

namespace sna_domain.Repositories;

public interface IGraphRepository
{
    Task<IEnumerable<Graph>> GetAllGraphsAsync(Guid userId, bool trackChChanges);
    Task<Graph> GetOneGraphById(Guid userId,Guid graphId, bool trackChChanges);
    void AddGraph(Graph graph);
    void EditGraph(Graph graph);
    void DeleteGraph(Graph graph);
}