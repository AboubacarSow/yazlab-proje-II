namespace sna_infrastructure.Persistence.Configurations;
public class NodeConfiguration : IEntityTypeConfiguration<Node>
{
        public void Configure(EntityTypeBuilder<Node> builder)
        {
            builder.ToTable("Nodes");
            builder.HasKey(node => node.Id);

            builder.Property(n=>n.GraphId).IsRequired();
            
            builder.HasOne(n=> n.Graph)
                    .WithMany(g=> g.Nodes)
                    .HasForeignKey(g => g.GraphId)
                    .OnDelete(DeleteBehavior.Cascade);
            builder.Property(n => n.NormalizedDegreeCentrality)
            .HasPrecision(4,3);
        }
}

public class ApplicationUserConfiguration : IEntityTypeConfiguration<ApplicationUser>
{
    public void Configure(EntityTypeBuilder<ApplicationUser> builder)
    {
        builder.HasKey(u => u.Id);
        builder.Property(u => u.UserName).IsRequired();
        builder.Property(u => u.Email).IsRequired();
        builder.Property(u => u.CreatedOn).IsRequired();
        builder.OwnsOne(u=>u.Address);
       
    }
}