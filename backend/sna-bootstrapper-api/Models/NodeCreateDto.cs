using System.ComponentModel.DataAnnotations;

namespace sna_bootstrapper_api.Models;

/// <summary>
/// İstemciden yeni bir düğüm (Node) oluşturmak için alınan veri modeli.
/// Entity yerine DTO kullanarak dış dünyaya açık alanları kontrollü belirleriz.
/// </summary>
public class NodeCreateDto
{
    /// <summary>
    /// Düğüm adı, zorunludur.
    /// </summary>
    [Required]
    [StringLength(200)]
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Aktiflik değeri [0,1] arası olmalıdır.
    /// </summary>
    [Range(0, 1)]
    public double Aktiflik { get; set; } = 0.5;

    /// <summary>
    /// Etkileşim sayısı, negatif olamaz.
    /// </summary>
    [Range(0, int.MaxValue)]
    public int Etkilesim { get; set; } = 0;

    /// <summary>
    /// Bağlantı sayısı (degree), negatif olamaz. Genelde servis tarafından güncellenir.
    /// </summary>
    [Range(0, int.MaxValue)]
    public int BaglantiSayisi { get; set; } = 0;

    /// <summary>
    /// Opsiyonel açıklama alanı.
    /// </summary>
    public string? Description { get; set; }

    /// <summary>
    /// Opsiyonel renk kodu (ör: #FF0000).
    /// </summary>
    public string? Color { get; set; }

    /// <summary>
    /// Canvas konumu için X koordinatı (opsiyonel).
    /// </summary>
    public double? PositionX { get; set; }

    /// <summary>
    /// Canvas konumu için Y koordinatı (opsiyonel).
    /// </summary>
    public double? PositionY { get; set; }
}
