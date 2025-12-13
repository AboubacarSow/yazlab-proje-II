using Microsoft.EntityFrameworkCore;
using sna_application.Interfaces;
using sna_data.Data;
using sna_data.Entities;

namespace sna_application.Repositories;

public class GraphRepository : IGraphRepository
{
    private readonly ApplicationDbContext _context;

    public GraphRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public Task<GraphData?> GetByIdAsync(int id) => _context.Graphs
        .AsNoTracking()
        .FirstOrDefaultAsync(g => g.Id == id);

    public Task<List<GraphData>> GetAllAsync() => _context.Graphs
        .AsNoTracking()
        .ToListAsync();

    public async Task AddAsync(GraphData graph)
    {
        await _context.Graphs.AddAsync(graph);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(GraphData graph)
    {
        _context.Graphs.Update(graph);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var entity = await _context.Graphs.FindAsync(id);
        if (entity is null) return;
        _context.Graphs.Remove(entity);
        await _context.SaveChangesAsync();
    }
}
