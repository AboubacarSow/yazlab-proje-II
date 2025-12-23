
using sna_domain.Entities;

namespace sna_application.Graphs.Commands.CreateGraph;


public record CreateGraphCommand(string Tag):IRequest<(Guid,string)>;

public class CreateGraphCommandValidator : AbstractValidator<CreateGraphCommand>
{
    public CreateGraphCommandValidator()
    {
        RuleFor(g=>g.Tag).NotEmpty().WithMessage("Graph's Tag is required to create a new one");
    }
}

internal class CreateGraphHandler(IGraphRepository _graphRepo, IUnitOfWork _unitOfWork)
: IRequestHandler<CreateGraphCommand, (Guid,string)>
{
    public async Task<(Guid, string)> Handle(CreateGraphCommand request, CancellationToken cancellationToken)
    {
        var graph = Graph.Create(request.Tag);
        await _graphRepo.AddGraphAsync(graph);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        var (Id, Tag) = (graph.Id,graph.Title);
        return (Id,Tag);
    }
}

