
namespace sna_application.Graphs.Queries.GetGraphSummary;

public record GetGraphSummaryCommand(Guid Id):IRequest<GraphSummary>;

internal class GetGraphSummaryHandler(IGraphRepository graphRepository) :
IRequestHandler<GetGraphSummaryCommand, GraphSummary>
{
    public async Task<GraphSummary> Handle(GetGraphSummaryCommand request, CancellationToken cancellationToken)
    {
        var graph = await graphRepository.GetGraphByIdAsync(request.Id,false)
        ?? throw new NotFoundException($"Graph with Id: {request.Id} not found");
        var graphDto = new GraphSummary(
            Id:graph.Id,
            NodeCount: graph.Order,
            EdgeCount: graph.Size,
            Title:graph.Title,
            Description:graph.Description!,
            IsConnected: graph.IsConnected(),
            IsWeighted:true,
            IsDirected:false,
            Density:graph.Order <=1 ? 0 : 2.0 * graph.Size/(graph.Order *(graph.Order-1)),
            AverageDegree : graph.Order ==0 ? 0.0 : 2.0 * graph.Size/graph.Order
        );

        return graphDto;
    }
}



