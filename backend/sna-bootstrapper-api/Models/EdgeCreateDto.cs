using System.ComponentModel.DataAnnotations;

namespace sna_bootstrapper_api.Models;

/// <summary>
/// İstemciden yeni bir kenar (Edge) oluşturmak için alınan veri modeli.
/// Ağırlık (Weight) istemciden gelmez, servis formülle hesaplar.
/// </summary>
public class EdgeCreateDto
{
    /// <summary>
    /// Kaynak düğüm ID, zorunlu.
    /// </summary>
    [Required]
    public int SourceNodeId { get; set; }

    /// <summary>
    /// Hedef düğüm ID, zorunlu.
    /// </summary>
    [Required]
    public int TargetNodeId { get; set; }

    /// <summary>
    /// Opsiyonel etkileşim sayısı. Negatif olamaz.
    /// </summary>
    [Range(0, int.MaxValue)]
    public int? InteractionCount { get; set; }
}
