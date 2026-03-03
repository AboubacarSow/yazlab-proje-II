using Microsoft.AspNetCore.Builder;

namespace sna_infrastructure.Seeders;

public static  class MigrationSeeders
{
    // Automatic Migration for Docker
    public static void AddMigration(this IApplicationBuilder app)
    {
        using var scope = app.ApplicationServices.CreateScope();
        var services = scope.ServiceProvider;
        try
        {
            var context = services.GetRequiredService<GraphVDbContext>();
            // This ensures the database is created and migrations are applied
            var pending=  context.Database.GetPendingMigrations();
            if(pending.Any())
                context.Database.Migrate();
        }
        catch (Exception ex)
        {
            Console.Write(ex.Message);
        }

    }
}
