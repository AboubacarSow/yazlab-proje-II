using Carter;
using Microsoft.Extensions.DependencyInjection;
using sna_application.Common.Behaviors;

namespace sna_application.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        //Register Mapster
        services.AddMapster();
        // Register FluentValidation
        services.AddValidatorsFromAssembly(typeof(AssemblyReference).Assembly);

        //Register Carter
        services.AddCarter();
        //Register MediatR
        services.AddMediatR(configuration: configuration =>
        {
            configuration.AddOpenBehavior(typeof(ValidationBehavior<,>));
            configuration.AddOpenBehavior(typeof(LoggingBehavior<,>));
            configuration.RegisterServicesFromAssembly(typeof(AssemblyReference).Assembly);
        });
        return services;
    }
}