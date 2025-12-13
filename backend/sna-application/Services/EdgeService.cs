using sna_application.Interfaces;
using sna_data.Entities;

namespace sna_application.Services;

public class EdgeService : IEdgeService
{
    private readonly IEdgeRepository _edgeRepository;
    private readonly INodeRepository _nodeRepository;

    public EdgeService(IEdgeRepository edgeRepository, INodeRepository nodeRepository)
    {
        _edgeRepository = edgeRepository;
        _nodeRepository = nodeRepository;
    }

    public Task<Edge?> GetByIdAsync(int id) => _edgeRepository.GetByIdAsync(id);

    public Task<List<Edge>> GetAllAsync() => _edgeRepository.GetAllAsync();

    public Task<List<Edge>> GetByNodeIdAsync(int nodeId) => _edgeRepository.GetByNodeIdAsync(nodeId);

    public async Task<Edge> CreateAsync(int sourceNodeId, int targetNodeId, int? interactionCount = null)
    {
        if (sourceNodeId == targetNodeId)
            throw new InvalidOperationException("Self-loop not allowed.");

        var duplicate = await _edgeRepository.ExistsAsync(sourceNodeId, targetNodeId);
        if (duplicate)
            throw new InvalidOperationException("Edge already exists.");

        var source = await _nodeRepository.GetByIdAsync(sourceNodeId)
            ?? throw new KeyNotFoundException("Source node not found.");
        var target = await _nodeRepository.GetByIdAsync(targetNodeId)
            ?? throw new KeyNotFoundException("Target node not found.");

        var weight = CalculateWeight(source, target);

        var edge = new Edge
        {
            SourceNodeId = sourceNodeId,
            TargetNodeId = targetNodeId,
            Weight = weight,
            InteractionCount = interactionCount,
            IsDirected = false
        };

        await _edgeRepository.AddAsync(edge);

        // Degree bilgisi tutuluyorsa güncelle
        source.BaglantiSayisi += 1;
        target.BaglantiSayisi += 1;
        await _nodeRepository.UpdateAsync(source);
        await _nodeRepository.UpdateAsync(target);

        return edge;
    }

    public Task DeleteAsync(int id) => _edgeRepository.DeleteAsync(id);

    private static double CalculateWeight(Node a, Node b)
    {
        var diffAktiflik = a.Aktiflik - b.Aktiflik;
        var diffEtkilesim = a.Etkilesim - b.Etkilesim;
        var diffBaglanti = a.BaglantiSayisi - b.BaglantiSayisi;

        var sumSquares =
            Math.Pow(diffAktiflik, 2) +
            Math.Pow(diffEtkilesim, 2) +
            Math.Pow(diffBaglanti, 2);

        return 1.0 / (1 + Math.Sqrt(sumSquares));
    }
}
