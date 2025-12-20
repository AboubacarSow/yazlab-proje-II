namespace sna_domain.Entities;

public class Message : BaseEntity
{
    public string FullName {get;set;} = default!;
    public string Email {get;set;} = default!;
    public string Phone { get;set;} = default!;
    public string Subject {get;set;} =default!;
    public string Content {get;set;} = default!;
    public bool IsRead { get;set;} = false;
}

