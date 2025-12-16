namespace sna_domain.Repositories;
public interface IUnitOfWork
{
    Task<bool> SaveChangesAsync(CancellationToken cancellationToken= default);
}