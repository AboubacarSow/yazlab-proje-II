using sna_application.Interfaces;
using sna_data.Entities;

namespace sna_application.Services;

public class NodeService : INodeService
{
    private readonly INodeRepository _nodeRepository;

    public NodeService(INodeRepository nodeRepository)
    {
        _nodeRepository = nodeRepository;
    }

    public Task<Node?> GetByIdAsync(int id) => _nodeRepository.GetByIdAsync(id);

    public Task<List<Node>> GetAllAsync() => _nodeRepository.GetAllAsync();

    public async Task<Node> CreateAsync(Node node)
    {
        EnsureNodeValid(node);

        var exists = await _nodeRepository.ExistsByNameAsync(node.Name);
        if (exists)
            throw new InvalidOperationException("Node with the same name already exists.");

        var normalized = NormalizeNode(node);
        await _nodeRepository.AddAsync(normalized);
        return normalized;
    }

    public async Task UpdateAsync(int id, Node node)
    {
        var existing = await _nodeRepository.GetByIdAsync(id);
        if (existing is null)
            throw new KeyNotFoundException("Node not found.");

        EnsureNodeValid(node);

        existing.Name = node.Name;
        existing.PositionX = node.PositionX;
        existing.PositionY = node.PositionY;
        existing.Aktiflik = ClampAktiflik(node.Aktiflik);
        existing.Etkilesim = node.Etkilesim;
        existing.BaglantiSayisi = node.BaglantiSayisi;
        existing.Description = node.Description;
        existing.Color = node.Color;
        existing.Centrality = node.Centrality;

        await _nodeRepository.UpdateAsync(existing);
    }

    public Task DeleteAsync(int id) => _nodeRepository.DeleteAsync(id);

    private static void EnsureNodeValid(Node node)
    {
        if (string.IsNullOrWhiteSpace(node.Name))
            throw new InvalidOperationException("Name is required.");

        if (node.Aktiflik < 0 || node.Aktiflik > 1)
            throw new InvalidOperationException("Aktiflik must be between 0 and 1.");
    }

    private static Node NormalizeNode(Node node)
    {
        node.Aktiflik = ClampAktiflik(node.Aktiflik);
        node.Etkilesim = node.Etkilesim < 0 ? 0 : node.Etkilesim;
        node.BaglantiSayisi = node.BaglantiSayisi < 0 ? 0 : node.BaglantiSayisi;
        return node;
    }

    private static double ClampAktiflik(double value) => Math.Min(1, Math.Max(0, value));
}
