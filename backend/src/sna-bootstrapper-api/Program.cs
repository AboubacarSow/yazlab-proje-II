using Carter;
using Scalar.AspNetCore;
using Serilog;
using sna_application.Extensions;
using sna_bootstrapper_api.Exceptions.Handlers;
using sna_infrastructure.Extensions;

var builder = WebApplication.CreateBuilder(args);

//Serilg Configuration
builder.Configuration.AddJsonFile("serilog.json");
builder.Host.UseSerilog((context, configuration) =>
    {
        //To configure minimally serilog, we need to provide these two parameters
        configuration.ReadFrom
                .Configuration(context.Configuration);
    });

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddApplication();
builder.Services.AddAuthorization();
//builder.Services.AddScoped<CustomExceptionMiddleware>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy
                .WithOrigins(
                    "http://localhost:4200",   // Angular dev
                    "https://localhost:4200"
                )
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

builder.Services.AddProblemDetails();
builder.Services.AddExceptionHandler<CustomExceptionHandler>();

var app = builder.Build();
//Logging configuration HTTP one
// Configure the HTTP request pipeline.

app.UseExceptionHandler();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

// 2. Logging des requêtes (pour voir les logs incluant l'erreur gérée)
app.UseSerilogRequestLogging();

// 3. Sécurité et CORS
app.UseCors("AllowFrontend");
app.UseAuthorization();

// 4. Mapping des endpoints (Carter, Controllers)
app.MapCarter();
app.MapControllers();

app.Run();
