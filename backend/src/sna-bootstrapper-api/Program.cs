using Carter;
using Scalar.AspNetCore;
using sna_application.Extensions;
using sna_bootstrapper_api.Exceptions.Handlers;
using sna_infrastructure.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddApplication();
builder.Services.AddAuthorization();

builder.Services.AddProblemDetails();
builder.Services.AddExceptionHandler<CustomExceptionHandler>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.MapCarter();
app.UseHttpsRedirection();
app.UseExceptionHandler();


app.UseAuthorization();

app.MapControllers();

app.Run();
