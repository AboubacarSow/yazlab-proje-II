using Microsoft.Extensions.Configuration;

namespace sna_infrastructure.Extensions;

public static class ServiceCollectionExtensions
{

    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {

        services.AddDbContext<GraphVDbContext>(options=> {
            options.UseSqlServer(configuration.GetConnectionString("DatabaseConnection"));
        });
        return services;
    }
}