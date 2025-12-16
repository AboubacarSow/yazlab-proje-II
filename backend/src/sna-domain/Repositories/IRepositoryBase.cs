using System.Linq.Expressions;

namespace sna_domain.Repositories;
public interface IRepositoryBase<T> where T : class
{
    Task<IEnumerable<T>> GetAllAsync(bool trackChChanges);
    Task<T?> GetOneByIdAsync(Expression<Func<T,bool>> expression, bool trackChChanges);
    Task Create(T entity);
    void Delete(T entity);
}
