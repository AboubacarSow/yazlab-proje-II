namespace sna_domain.Exceptions;

public class DomainException : Exception
{
    public DomainException(string message): base(message){}
}



public class EmptyGraphException : Exception
{
    public EmptyGraphException(string ressourceType): base($"Graph with Id: {ressourceType} is almost empty and contains less than two 2"){}
}