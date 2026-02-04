using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Carter;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using sna_application.Common.Behaviors;

namespace sna_application.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApplication(this IServiceCollection services, IConfiguration configuration)
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

        var jwtsettings = configuration.GetRequiredSection("JwtSettings");
        string secretKey = jwtsettings["SecretKey"]!;
        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters()
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateIssuerSigningKey = true,
                ValidateLifetime=true,
                ValidIssuer = jwtsettings["ValidIssuer"],
                ValidAudience = jwtsettings["ValidAudience"],
                IssuerSigningKey = new SymmetricSecurityKey
                (Encoding.UTF8.GetBytes(secretKey)),
                NameClaimType = JwtRegisteredClaimNames.Sub,
                

            };

                
        });
        return services;
    }
}