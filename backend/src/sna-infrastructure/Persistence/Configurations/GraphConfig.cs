
namespace sna_infrastructure.Persistence.Configurations;

public class GraphConfiguration : IEntityTypeConfiguration<Graph>
{
    public void Configure(EntityTypeBuilder<Graph> builder)
    {
        builder.HasKey(g=>g.Id);

        builder.Property(g=>g.Title)
                .IsRequired(true);
        builder.Property(g => g.Description).IsRequired(false);

        builder.HasMany(g=>g.Nodes)
                .WithOne(n=>n.Graph)
                .HasForeignKey(g=>g.GraphId)
                .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(g=>g.Edges)
                .WithOne(e=>e.Graph)
                .HasForeignKey(e=>e.GraphId)
                .OnDelete(DeleteBehavior.Cascade);
        
    }
}
