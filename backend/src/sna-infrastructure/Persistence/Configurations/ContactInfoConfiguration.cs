namespace sna_infrastructure.Persistence.Configurations;

public class ContactInfoConfiguration : IEntityTypeConfiguration<ContactInfo>
{
      public void Configure(EntityTypeBuilder<ContactInfo> builder)
    {
        builder.HasKey(m=>m.Id);
        builder.Property(m=>m.Email).IsRequired();
        builder.Property(m=>m.FullAddress).IsRequired();
    }
}
