namespace sna_domain.Entities;

public class ApplicationUser
{
    public Guid Id {get;set;}
    public string FirstName { get; set; } = default!;
    public string LastName { get; set; } = default!;
    public string Image { get; set; } = default!;
    public Address Address { get; set; } = new();
    public IList<Graph> Graphs {get;set;}=[];

}

