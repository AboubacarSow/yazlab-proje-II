using sna_bootstrapper_api.Models;
using sna_data.Entities;

namespace sna_bootstrapper_api.Models;

/// <summary>
/// Basit manuel mapper. Küçük projede AutoMapper yerine açık dönüşümler kullanıyoruz.
/// </summary>
public static class ApiMapper
{
    /// <summary>
    /// Node entity → NodeDto dönüşümü. İstemciye geri dönerken kullanılır.
    /// </summary>
    public static NodeDto ToDto(Node node)
    {
        return new NodeDto
        {
            Id = node.Id,
            Name = node.Name,
            Aktiflik = node.Aktiflik,
            Etkilesim = node.Etkilesim,
            BaglantiSayisi = node.BaglantiSayisi,
            Description = node.Description,
            Color = node.Color,
            Centrality = node.Centrality,
            PositionX = node.PositionX,
            PositionY = node.PositionY
        };
    }

    /// <summary>
    /// NodeCreateDto → Node entity dönüşümü. Servis katmanına geçmeden önce kullanılır.
    /// </summary>
    public static Node ToEntity(NodeCreateDto dto)
    {
        return new Node
        {
            Name = dto.Name,
            Aktiflik = dto.Aktiflik,
            Etkilesim = dto.Etkilesim,
            BaglantiSayisi = dto.BaglantiSayisi,
            Description = dto.Description,
            Color = dto.Color,
            PositionX = dto.PositionX ?? 0,
            PositionY = dto.PositionY ?? 0
        };
    }

    /// <summary>
    /// Edge entity → EdgeDto dönüşümü.
    /// </summary>
    public static EdgeDto ToDto(Edge edge)
    {
        return new EdgeDto
        {
            Id = edge.Id,
            SourceNodeId = edge.SourceNodeId,
            TargetNodeId = edge.TargetNodeId,
            Weight = edge.Weight,
            InteractionCount = edge.InteractionCount
        };
    }
}
