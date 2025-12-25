
using sna_domain.Entities;

namespace sna_application.Graphs.Commands.ImportGraphSnapshot;




public record ImportGraphSnapshotCommand(
    string Title,
    string? Description,
    List<NodeSnapshotDto> Nodes,
    List<EdgeSnapshotDto> Edges): IRequest<Guid>;

internal class ImportGraphSnapshotHandler(
    IGraphRepository graphRepository, IUnitOfWork unitOfWork
) : IRequestHandler<ImportGraphSnapshotCommand, Guid>
{
    public async Task<Guid> Handle(ImportGraphSnapshotCommand request, CancellationToken cancellationToken)
    {
        var graph = Graph.Create(
            request.Title,
            request?.Description!
        );

        // 2. Map snapshot nodes → real nodes
        var nodeMap = new Dictionary<int, Node>();

        foreach (var nodeDto in request!.Nodes)
        {
            var node = Graph.CreateNode(graph.Id,
                            nodeDto.Tag,
                            nodeDto.Activity,
                            nodeDto.Interaction);
            graph.AddNode(node);
           

            nodeMap[nodeDto.TempId] = node;
        }

        // 3. Create edges using mapping
        foreach (var edgeDto in request.Edges)
        {
            var from = nodeMap[edgeDto.NodeA];
            var to   = nodeMap[edgeDto.NodeB];

            graph.ConnectNodes(from, to);
        }

        // 4. Persist
        await graphRepository.AddGraphAsync(graph);
        await unitOfWork.SaveChangesAsync(cancellationToken);
        return graph.Id;
    }
}
