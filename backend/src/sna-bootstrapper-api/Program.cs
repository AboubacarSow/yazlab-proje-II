using sna_infrastructure.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// DbContext ekleniyor - Veritabanı bağlantısı

builder.Services.AddControllers();
builder.Services.AddOpenApi();

builder.Services.AddInfrastructure(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
