namespace sna_domain.Entities;

public class ContactInfo : BaseEntity
{
    public string Email { get; set; } = default!;
    public string Phone { get; set; } = default!;
    public string FullAddress { get; set; } = default!;

}

