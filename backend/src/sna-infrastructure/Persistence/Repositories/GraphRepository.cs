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

    public async Task<IEnumerable<Graph>> GetAllGraphsAsync(bool trackChChanges)
        => await GetAllAsync(trackChChanges);

    public async Task<Graph?> GetGraphByIdAsync(int graphId, bool trackChChanges)
    {
        IQueryable<Graph> query = _context.Graphs;

        if(!trackChChanges) query = query.AsNoTracking();
        var graph = await query.Include(g=>g.Nodes)
                    .Include(g=>g.Edges)
                    .FirstOrDefaultAsync(g=>g.Id==graphId); 
            
        return graph;
    }
}
