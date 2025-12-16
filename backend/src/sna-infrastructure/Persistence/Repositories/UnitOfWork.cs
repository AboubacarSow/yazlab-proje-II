
namespace sna_infrastructure.Persistence.Repositories;

internal class UnitOfWork(GraphVDbContext _context) : IUnitOfWork
{
    public async Task<bool> SaveChangesAsync(CancellationToken cancellationToken = default)
        => await _context.SaveChangesAsync(cancellationToken) > 0;
}
