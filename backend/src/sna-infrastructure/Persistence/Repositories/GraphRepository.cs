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

    public async Task<List<Graph>> GetAllGraphsAsync(bool trackChChanges)
    {
        IQueryable<Graph> query = _context.Graphs;
        if(!trackChChanges) 
            query= query.AsNoTracking();
        var graphs= query.Include(g=>g.Nodes)
                        .Include(g=>g.Edges);
        return await graphs.ToListAsync();
    }

    public async Task<Graph?> GetGraphByIdAsync(Guid graphId, bool trackChChanges)
    {
        IQueryable<Graph> query = _context.Graphs;

        if(!trackChChanges) query = query.AsNoTracking();
        var graph = await query.Include(g=>g.Nodes)
                    .Include(g=>g.Edges)
                        .ThenInclude(e=>e.NodeA)
                    .Include(g=>g.Edges)
                        .ThenInclude(e=>e.NodeB)
                    .FirstOrDefaultAsync(g=>g.Id==graphId); 
            
        return graph;
    }
}
