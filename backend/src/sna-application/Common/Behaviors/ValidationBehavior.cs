namespace sna_application.Common.Behaviors;
public class ValidationBehavior<TRequest, TResponse>(IEnumerable<IValidator<TRequest>> validators) : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
{
    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        if (validators.Any())
        {
            var context = new ValidationContext<TRequest>(request);// Create a validation context for the request
            //get all validators for the request type
            var validationrErrors = await Task
            .WhenAll(validators.Select
            (v => v.ValidateAsync(context, cancellationToken)));

            //get all errors from the validation results
            var errors = validationrErrors.Where(x=> x.Errors.Count != 0)
            .Select(x => x.Errors).ToList();
            if(errors.Any())
            {
                foreach(var error in errors)
                {
                    throw new ValidationException(error);
                }
            }
        }
        return await next(cancellationToken); // Call the next handler in the pipeline
    }
        
}
