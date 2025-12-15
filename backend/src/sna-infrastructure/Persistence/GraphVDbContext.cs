namespace sna_infrastructure.Persistence;

internal class GraphVDbContext : DbContext
{
    internal DbSet<Graph> Graphs => Set<Graph>();
    internal DbSet<Node> Vertices => Set<Node>();
    internal DbSet<Edge> Edges => Set<Edge>();

    internal DbSet<ContactInfo> ContactInfos => Set<ContactInfo>();
    internal DbSet<Message> Messages => Set<Message>();

    public GraphVDbContext(DbContextOptions options): base(options){}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AssemblyReference).Assembly);
        base.OnModelCreating(modelBuilder);
    }
}