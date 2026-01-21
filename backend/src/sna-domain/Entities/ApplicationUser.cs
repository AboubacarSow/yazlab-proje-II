using Microsoft.AspNetCore.Identity;
using sna_domain.ValueObjects;

namespace sna_domain.Entities;

public class ApplicationUser : IdentityUser<Guid>
{
    public string FirstName { get; set; } = default!;
    public string LastName { get; set; } = default!;
    public string? Image { get; set; } = default!;
    public Address? Address { get; set; } = new();
     public DateTime CreatedOn { get; set; } = default!;
    public string? RefreshToken { get; set; }
    public DateTime? RefreshTokenExpiresTime { get; set; }

    public ICollection<Graph>? Graphs {get;set;}= [];
    public override string? Email
    {
        get => base.Email!;

        set
        {
            base.Email = value;
            base.UserName = value;
        }
    }

    public ApplicationUser(){}
    public ApplicationUser(string firstname,
    string lastname,
    string phonenumber,
    string email, Address address=null!)
    {
        FirstName = firstname;
        LastName = lastname;
        PhoneNumber = phonenumber;
        Email = email;
        Address = address?? new();
        CreatedOn= DateTime.UtcNow;
    }
}

