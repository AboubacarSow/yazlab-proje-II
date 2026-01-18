namespace sna_domain.Entities;

public class GraphUser
{
    public Guid Id {get;set;}
    public Guid GraphId {get;set;}
    public Graph Graph {get;set;}=default!;
    public Guid UserId {get;set;}
    public ApplicationUser User {get;set;}=default!;
}

