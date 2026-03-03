using Carter;
using Scalar.AspNetCore;
using Serilog;
using sna_application.Extensions;
using sna_bootstrapper_api.Exceptions.Handlers;
using sna_infrastructure.Extensions;
using sna_infrastructure.Seeders;

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
builder.Services.AddApplication(builder.Configuration);
builder.Services.AddAuthorization();
//builder.Services.AddScoped<CustomExceptionMiddleware>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins(
                    "http://localhost:4200",   // Angular dev
                    "https://localhost:4200"
                ).AllowAnyHeader()
                .AllowAnyMethod();
        });
});

builder.Services.AddProblemDetails();
builder.Services.AddExceptionHandler<CustomExceptionHandler>();

var app = builder.Build();

app.AddMigration();
app.UseExceptionHandler();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseSerilogRequestLogging();

app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();


app.MapCarter();
app.MapControllers();

app.Run();
