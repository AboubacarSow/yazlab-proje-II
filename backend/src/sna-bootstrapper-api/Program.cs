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
        configuration
        .ReadFrom.Configuration(context.Configuration);
        //.MinimumLevel.Override("Microsoft", new LoggingLevelSwitch(LogEventLevel.Warning))
        //.WriteTo.File(path:"Logs/Restaurant-API-.log", rollingInterval: RollingInterval.Day,rollOnFileSizeLimit:true)//default size:1GB
        //.WriteTo.Console(outputTemplate :"[{Timestamp:dd:HH:mm:ss} {Level:u3}] {Message:lj} |{SourceContext} | {NewLine}{Exception}");
    });

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
