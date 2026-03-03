using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using sna_application.Interfaces;
using sna_infrastructure.Persistence.Repositories;
using sna_infrastructure.Services;

namespace sna_infrastructure.Extensions;

public static class ServiceCollectionExtensions
{

    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {

        services.AddDbContext<GraphVDbContext>(options=> {
            options.UseSqlServer(configuration.GetConnectionString("DatabaseConnection"));
        });

        services.AddIdentity<ApplicationUser, IdentityRole<Guid>>(options =>
        {
            options.User.RequireUniqueEmail=true;
            options.Password.RequiredLength=8;
            options.Password.RequireNonAlphanumeric=true;
            options.Password.RequireDigit=true;
            options.Password.RequireUppercase=true;
            options.Password.RequireLowercase=true;
        })
        .AddEntityFrameworkStores<GraphVDbContext>()
        .AddDefaultTokenProviders();
        
        services.AddScoped(typeof(IRepositoryBase<>),typeof(RepositoryBase<>));
        services.AddScoped<IUnitOfWork,UnitOfWork>();
        services.AddScoped<IMessageRepository,MessageRepository>();
        services.AddScoped<IContactInfoRepository,ContactInfoRepository>();
        services.AddScoped<IGraphRepository,GraphRepository>();
        services.AddScoped<IJWTService,JWTService>();

        
        return services;
    }
}