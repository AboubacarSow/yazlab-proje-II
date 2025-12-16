using Microsoft.Extensions.Configuration;
using sna_infrastructure.Persistence.Repositories;

namespace sna_infrastructure.Extensions;

public static class ServiceCollectionExtensions
{

    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {

        services.AddDbContext<GraphVDbContext>(options=> {
            options.UseSqlServer(configuration.GetConnectionString("DatabaseConnection"));
        });

        services.AddScoped(typeof(IRepositoryBase<>),typeof(RepositoryBase<>));
        services.AddScoped<IUnitOfWork,UnitOfWork>();
        services.AddScoped<IMessageRepository,MessageRepository>();
        services.AddScoped<IContactInfoRepository,ContactInfoRepository>();
        services.AddScoped<IGraphRepository,GraphRepository>();
        return services;
    }
}