namespace sna_infrastructure.Persistence.Repositories;

internal class GraphRepository(GraphVDbContext context)
        : RepositoryBase<Graph>(context), IGraphRepository
{
    public async Task AddGraphAsync(Graph graph)
        => await Create(entity: graph);

    public void DeleteGraph(Graph graph)
        => Delete(graph);

    public void EditGraph(Graph graph)
        => _context.Update(graph);

    public async Task<Graph?> GetOneGraphById(Guid graphId, bool trackChChanges)
        => await GetOneByIdAsync(g=>g.Id == graphId,trackChChanges)!;
}
