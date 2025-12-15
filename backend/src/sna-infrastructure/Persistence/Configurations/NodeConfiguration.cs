namespace sna_infrastructure.Persistence.Configurations;
public class NodeConfiguration : IEntityTypeConfiguration<Node>
{
        public void Configure(EntityTypeBuilder<Node> builder)
        {
            builder.HasKey(node => node.Id);

            builder.Property(n=>n.GraphId).IsRequired();
            
            builder.HasOne(n=> n.Graph)
                    .WithMany(g=> g.Nodes)
                    .HasForeignKey(g => g.GraphId)
                    .OnDelete(DeleteBehavior.Restrict);
            
        }
}