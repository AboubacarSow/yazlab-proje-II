
namespace sna_infrastructure.Persistence.Repositories;

internal class UnitOfWork(GraphVDbContext _context) : IUnitOfWork
{
    public async Task<bool> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        
        var ligne =await _context.SaveChangesAsync(cancellationToken);
        return ligne > 0;
    }
}
