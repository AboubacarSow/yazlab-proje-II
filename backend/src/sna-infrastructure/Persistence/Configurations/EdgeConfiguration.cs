namespace sna_infrastructure.Persistence.Configurations;

public class EdgeConfiguration : IEntityTypeConfiguration<Edge>
{
    public void Configure(EntityTypeBuilder<Edge> builder)
    {
        builder.HasKey(e=> new {e.GraphId, e.NodeAId, e.NodeBId});
        
        builder.HasIndex(e => new { e.GraphId, e.NodeAId, e.NodeBId})
       .IsUnique();


        builder.ToTable("Edges", table =>
        {
            table.HasCheckConstraint(
                "CK_Edges_NodeOrder",
                "[NodeAId] < [NodeBId]"
            );
        });


        builder.HasOne(e=>e.NodeA)
            .WithMany()
            .HasForeignKey(n=>n.NodeAId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(e=>e.NodeB)
            .WithMany()
            .HasForeignKey(n=>n.NodeBId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(e => e.Graph)
               .WithMany(g => g.Edges)
               .HasForeignKey(e => e.GraphId)
               .OnDelete(DeleteBehavior.NoAction);

        builder.Property(e=>e.Weight).HasPrecision(4,3);
    }

}
