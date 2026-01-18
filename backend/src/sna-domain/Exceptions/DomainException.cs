namespace sna_domain.Exceptions;

public class DomainException(string message) : Exception(message)
{
}



public class EmptyGraphException(string ressourceType) : 
    Exception($"Graph with Id: {ressourceType} is almost empty and contains less than two 2")
{
}


