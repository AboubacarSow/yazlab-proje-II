using System.Linq.Expressions;

namespace sna_infrastructure.Persistence.Repositories;

internal class RepositoryBase<T>(GraphVDbContext context) : IRepositoryBase<T> where T : class
{
    protected GraphVDbContext _context = context;
    public async Task Create(T entity)
    {
        await _context.Set<T>().AddAsync(entity);
    }

    public void Delete(T entity)
    {
        _context.Set<T>().Remove(entity);
    }

    public async Task<IEnumerable<T>> GetAllAsync(bool trackChChanges)
    {
        return !trackChChanges ?
            await _context.Set<T>().AsNoTracking().ToListAsync() :
            await _context.Set<T>().ToListAsync();

    }

    public async Task<T?> GetOneByIdAsync(Expression<Func<T,bool>> expression, bool trackChChanges = false)
    {
        return !trackChChanges ?
         await _context.Set<T>().AsNoTracking().Where(expression).FirstOrDefaultAsync()!:
         await _context.Set<T>().Where(expression).FirstOrDefaultAsync()!;
    }
}