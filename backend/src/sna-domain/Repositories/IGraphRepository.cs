namespace sna_domain.Repositories;

public interface IGraphRepository
{
    //Task<IEnumerable<Graph>> GetAllGraphsAsync(Guid userId, bool trackChChanges);

    
    Task<Graph?> GetOneGraphById(Guid graphId, bool trackChChanges);
    Task AddGraphAsync(Graph graph);
    void EditGraph(Graph graph);
    void DeleteGraph(Graph graph);
}
