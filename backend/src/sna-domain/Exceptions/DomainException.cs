namespace sna_domain.Exceptions;

public class DomainException : Exception
{
    public DomainException(string message): base(message){}
}

public class NotFoundException : Exception
{
    public NotFoundException(string ressourceType, string ressourceIdentifier, string reference)
    : base($"{ressourceType} with Id : {ressourceIdentifier} not found in reference :{reference}")
    {
        
    }
}

public class EmptyGraphException : Exception
{
    public EmptyGraphException(string ressourceType): base($"Graph with Id: {ressourceType} is almost empty and contains less than two 2"){}
}