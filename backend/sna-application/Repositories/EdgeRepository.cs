using Microsoft.EntityFrameworkCore;
using sna_application.Interfaces;
using sna_data.Data;
using sna_data.Entities;

namespace sna_application.Repositories;

public class EdgeRepository : IEdgeRepository
{
    private readonly ApplicationDbContext _context;

    public EdgeRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public Task<Edge?> GetByIdAsync(int id) => _context.Edges
        .AsNoTracking()
        .Include(e => e.SourceNode)
        .Include(e => e.TargetNode)
        .FirstOrDefaultAsync(e => e.Id == id);

    public Task<List<Edge>> GetAllAsync() => _context.Edges
        .AsNoTracking()
        .Include(e => e.SourceNode)
        .Include(e => e.TargetNode)
        .ToListAsync();

    public Task<List<Edge>> GetByNodeIdAsync(int nodeId) => _context.Edges
        .AsNoTracking()
        .Where(e => e.SourceNodeId == nodeId || e.TargetNodeId == nodeId)
        .ToListAsync();

    public async Task AddAsync(Edge edge)
    {
        if (edge.SourceNodeId == edge.TargetNodeId)
            throw new InvalidOperationException("Self-loop not allowed.");

        var nodesExist = await NodesExistAsync(edge.SourceNodeId, edge.TargetNodeId);
        if (!nodesExist)
            throw new InvalidOperationException("Source or target node not found.");

        var duplicate = await ExistsAsync(edge.SourceNodeId, edge.TargetNodeId);
        if (duplicate)
            throw new InvalidOperationException("Edge already exists.");

        await _context.Edges.AddAsync(edge);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var entity = await _context.Edges.FindAsync(id);
        if (entity is null) return;
        _context.Edges.Remove(entity);
        await _context.SaveChangesAsync();
    }

    public Task<bool> ExistsAsync(int sourceNodeId, int targetNodeId) => _context.Edges
        .AnyAsync(e =>
            (e.SourceNodeId == sourceNodeId && e.TargetNodeId == targetNodeId) ||
            (e.SourceNodeId == targetNodeId && e.TargetNodeId == sourceNodeId));

    public async Task<bool> NodesExistAsync(int sourceNodeId, int targetNodeId)
    {
        var sources = await _context.Nodes.CountAsync(n => n.Id == sourceNodeId);
        if (sources == 0) return false;
        var targets = await _context.Nodes.CountAsync(n => n.Id == targetNodeId);
        return targets > 0;
    }
}
