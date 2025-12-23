namespace sna_bootstrapper_api.Exceptions;
public class BadRequestException : Exception
{
    public IEnumerable<object> Errors = default!;

    public string? Details { get; }


    public BadRequestException(string message, string details)
        : base(message)
    {
        Details = details;
    }

    public BadRequestException(string? message, IEnumerable<object> enumerable) : base(message)
    {
        this.Errors = enumerable;
    }
}