using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using sna_domain.Exceptions;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;

namespace sna_bootstrapper_api.Exceptions.Handlers;

//public class CustomExceptionHandler(ILogger<CustomExceptionHandler> _logger): IMiddleware
//{
//    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
//    {
//        try
//        {
//            await next.Invoke(context);
//        }
//        catch (FluentValidation.ValidationException validationException)
//        {
//            _logger.LogWarning("{Message}", validationException.Message);
//            context.Response.StatusCode = StatusCodes.Status400BadRequest;
//            var problemDetails = new ProblemDetails
//            {
//                Title = validationException.GetType().Name,
//                Status = context.Response.StatusCode,
//                Detail = validationException.Message,
//                Instance = context.Request.Path
//            };

//            problemDetails.Extensions.Add("TraceId", context.TraceIdentifier);
//            problemDetails.Extensions.Add("ValidationError", validationException.Errors);
//            await context.Response.WriteAsJsonAsync(problemDetails);

//        }
//        catch (NotFoundException notFoundException)
//        {
//            _logger.LogWarning("Resource not found:{@Resource}", notFoundException.Message);
//            context.Response.StatusCode = StatusCodes.Status404NotFound;
//            var problemDetails = new ProblemDetails
//            {
//                Title = notFoundException.GetType().Name,
//                Status = context.Response.StatusCode,
//                Detail = notFoundException.Message,
//                Instance = context.Request.Path
//            };

//            problemDetails.Extensions.Add("TraceId", context.TraceIdentifier);
//            await context.Response.WriteAsJsonAsync(problemDetails);
//        }
//        catch(BadRequestException badRequestException)
//        {
//            _logger.LogWarning("Resource not found:{@Resource}", badRequestException.Message);
//            context.Response.StatusCode = StatusCodes.Status400BadRequest;
//            var problemDetails = new ProblemDetails
//            {
//                Title = badRequestException.GetType().Name,
//                Status = context.Response.StatusCode,
//                Detail = badRequestException.Message,
//                Instance = context.Request.Path
//            };

//            problemDetails.Extensions.Add("TraceId", context.TraceIdentifier);
//            await context.Response.WriteAsJsonAsync(problemDetails);
//        }
//        catch(InternalServerException internalServerException)
//        {
//            _logger.LogWarning("Resource not found:{@Resource}", internalServerException.Message);
//            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
//            var problemDetails = new ProblemDetails
//            {
//                Title = internalServerException.GetType().Name,
//                Status = context.Response.StatusCode,
//                Detail = internalServerException.Message,
//                Instance = context.Request.Path
//            };

//            problemDetails.Extensions.Add("TraceId", context.TraceIdentifier);
//            await context.Response.WriteAsJsonAsync(problemDetails);
//        }
//        catch (Exception ex)
//        {
//            _logger.LogError("Something went wrong:{Message}", ex.Message);

//            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
//            await context.Response.WriteAsJsonAsync(new
//            {
//                statusCode = context.Response.StatusCode,
//                message = ex.Message
//            });

//        }
//    }

//}
public class CustomExceptionHandler(ILogger<CustomExceptionHandler> logger) : IExceptionHandler
{
    [DebuggerStepThrough]
    public async ValueTask<bool> TryHandleAsync(HttpContext context, Exception exception, CancellationToken cancellationToken)
    {
        logger.LogError(
            "Error Message: {exceptionMessage}, Time of occurrence {time}",
            exception.Message, DateTime.UtcNow);

        (string Detail, string Title, int StatusCode) details = exception switch
        {
            InternalServerException =>
            (
                exception.Message,
                exception.GetType().Name,
                context.Response.StatusCode = StatusCodes.Status500InternalServerError
            ),
            ValidationException =>
            (
                exception.Message,
                exception.GetType().Name,
                context.Response.StatusCode = StatusCodes.Status400BadRequest
            ),
            BadRequestException =>
            (
                exception.Message,
                exception.GetType().Name,
                context.Response.StatusCode = StatusCodes.Status400BadRequest
            ),
            NotFoundException =>
            (
                exception.Message,
                exception.GetType().Name,
                context.Response.StatusCode = StatusCodes.Status404NotFound
            ),
            _ =>
            (
                exception.Message,
                exception.GetType().Name,
                context.Response.StatusCode = StatusCodes.Status500InternalServerError
            )
        };

        var problemDetails = new ProblemDetails
        {
            Title = details.Title,
            Status = details.StatusCode,
            Detail = details.Detail,
            Instance = context.Request.Path
        };

        problemDetails.Extensions.Add("TraceId", context.TraceIdentifier);
        if (exception is FluentValidation.ValidationException validationException)
            problemDetails.Extensions.Add("ValidationResult", validationException.Errors);

        await context.Response.WriteAsJsonAsync(problemDetails, cancellationToken);
        return true;

    }
}