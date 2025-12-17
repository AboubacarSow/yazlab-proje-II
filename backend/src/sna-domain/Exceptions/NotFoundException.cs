namespace sna_domain.Exceptions;
public class NotFoundException : Exception
{
    public NotFoundException(string message) 
        : base(message)
    {
    }
    public NotFoundException(string ressourceType, string ressourceIdentifier, string reference)
    : base($"{ressourceType} with Id : {ressourceIdentifier} not found in reference :{reference}")
    {
        
    }

    public NotFoundException(string name, object key) 
        : base($"Ressource \"{name}\" ({key}) was not found.")
    {
    }
}
