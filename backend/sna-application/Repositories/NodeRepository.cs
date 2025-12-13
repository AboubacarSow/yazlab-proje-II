using Microsoft.EntityFrameworkCore;
using sna_application.Interfaces;
using sna_data.Data;
using sna_data.Entities;

namespace sna_application.Repositories;

public class NodeRepository : INodeRepository
{
    private readonly ApplicationDbContext _context;

    public NodeRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public Task<Node?> GetByIdAsync(int id) => _context.Nodes
        .AsNoTracking()
        .FirstOrDefaultAsync(n => n.Id == id);

    public Task<List<Node>> GetAllAsync() => _context.Nodes
        .AsNoTracking()
        .ToListAsync();

    public async Task AddAsync(Node node)
    {
        await _context.Nodes.AddAsync(node);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Node node)
    {
        _context.Nodes.Update(node);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var entity = await _context.Nodes.FindAsync(id);
        if (entity is null) return;
        _context.Nodes.Remove(entity);
        await _context.SaveChangesAsync();
    }

    public Task<bool> ExistsByNameAsync(string name) => _context.Nodes
        .AnyAsync(n => n.Name == name);
}
