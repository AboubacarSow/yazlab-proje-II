using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace sna_infrastructure.Persistence;

public class GraphVDbContext 
    : IdentityDbContext<ApplicationUser,IdentityRole<Guid>,Guid>
{
    public DbSet<Graph> Graphs => Set<Graph>();
    public DbSet<ContactInfo> ContactInfos => Set<ContactInfo>();
    public DbSet<Message> Messages => Set<Message>();

    public GraphVDbContext(DbContextOptions<GraphVDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AssemblyReference).Assembly);
    }
}