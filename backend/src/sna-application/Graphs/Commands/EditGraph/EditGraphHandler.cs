

namespace sna_application.Graphs.Commands.EditGraph;

public record EditGraphCommand(Guid Id, 
        string Title, string Description): IRequest<bool>;

internal class EditGraphHanlder(IGraphRepository graphRepository, IUnitOfWork unitOfWork)
: IRequestHandler<EditGraphCommand, bool>
{
    public async Task<bool> Handle(EditGraphCommand request, CancellationToken cancellationToken)
    {
        var graph = await graphRepository.GetGraphByIdAsync(request.Id, true) ??
            throw new NotFoundException($"Grap with Id:{request.Id} no found");

        if(!string.IsNullOrEmpty(request.Title)) graph.Title = request.Title;
        if(!string.IsNullOrEmpty(request.Description)) graph.Description = request.Description;  
        return await unitOfWork.SaveChangesAsync(cancellationToken);
    }
}
