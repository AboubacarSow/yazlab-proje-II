using sna_application.Interfaces;
using sna_data.Entities;

namespace sna_application.Services;

public class GraphService : IGraphService
{
    private readonly IGraphRepository _graphRepository;

    public GraphService(IGraphRepository graphRepository)
    {
        _graphRepository = graphRepository;
    }

    public Task<GraphData?> GetByIdAsync(int id) => _graphRepository.GetByIdAsync(id);

    public Task<List<GraphData>> GetAllAsync() => _graphRepository.GetAllAsync();

    public async Task<GraphData> CreateAsync(GraphData graph)
    {
        EnsureGraphValid(graph);
        await _graphRepository.AddAsync(graph);
        return graph;
    }

    public async Task UpdateAsync(int id, GraphData graph)
    {
        var existing = await _graphRepository.GetByIdAsync(id);
        if (existing is null)
            throw new KeyNotFoundException("Graph not found.");

        EnsureGraphValid(graph);

        existing.Name = graph.Name;
        existing.Description = graph.Description;
        existing.UpdatedAt = DateTime.UtcNow;

        await _graphRepository.UpdateAsync(existing);
    }

    public Task DeleteAsync(int id) => _graphRepository.DeleteAsync(id);

    private static void EnsureGraphValid(GraphData graph)
    {
        if (string.IsNullOrWhiteSpace(graph.Name))
            throw new InvalidOperationException("Graph name is required.");
    }
}
