namespace sna_domain.Repositories;

public interface IGraphRepository
{
    Task<List<Graph>> GetAllGraphsAsync(bool trackChChanges);
    Task<Graph?> GetGraphByIdAsync(Guid graphId, bool trackChChanges);
    Task AddGraphAsync(Graph graph);
    void EditGraph(Graph graph);
    void DeleteGraph(Graph graph);
}
