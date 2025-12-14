namespace sna_domain.Exceptions;

public class DomainException : Exception
{
    string _message;
    public DomainException(){ _message = string.Empty;}
    public DomainException(string errorMessage)
    {
        _message = errorMessage;
    }
}