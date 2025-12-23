

namespace sna_application.Graphs.Commands.EditGraph;

public record EditGraphCommand(int Id, 
        string Tag, string Description): IRequest<bool>;

internal class EditGraphHanlder(IGraphRepository graphRepository, IUnitOfWork unitOfWork)
: IRequestHandler<EditGraphCommand, bool>
{
    public async Task<bool> Handle(EditGraphCommand request, CancellationToken cancellationToken)
    {
        var graph = await graphRepository.GetGraphByIdAsync(request.Id, true) ??
            throw new NotFoundException($"Grap with Id:{request.Id} no found");

        if(!string.IsNullOrEmpty(request.Tag)) graph.Tag = request.Tag;
        if(!string.IsNullOrEmpty(request.Description)) graph.Description = request.Description;  
        return await unitOfWork.SaveChangesAsync(cancellationToken);
    }
}
