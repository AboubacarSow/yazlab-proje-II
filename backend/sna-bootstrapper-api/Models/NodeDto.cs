namespace sna_bootstrapper_api.Models;

/// <summary>
/// İstemciye geri döndüğümüz düğüm modeli.
/// İç alanları (CreatedAt, navigation) gibi detayları gizleyerek kararlı bir API sözleşmesi sağlar.
/// </summary>
public class NodeDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public double Aktiflik { get; set; }
    public int Etkilesim { get; set; }
    public int BaglantiSayisi { get; set; }
    public string? Description { get; set; }
    public string? Color { get; set; }
    public double? Centrality { get; set; }
    public double? PositionX { get; set; }
    public double? PositionY { get; set; }
}
