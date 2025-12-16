using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using sna_domain.Entities;

namespace sna_infrastructure.Persistence.Configurations;

public class MessageConfiguration : IEntityTypeConfiguration<Message>
{
    public void Configure(EntityTypeBuilder<Message> builder)
    {
        builder.HasKey(m=>m.Id);
        builder.Property(m=>m.FullName).IsRequired();
        builder.Property(m=>m.Email).IsRequired();
        builder.Property(m=>m.Phone).IsRequired();
      
    }
}
