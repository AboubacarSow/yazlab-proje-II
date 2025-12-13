namespace sna_data.Entities;

/// <summary>
/// Graf meta bilgilerini tutar (opsiyonel - farklı graflar için)
/// </summary>
public class GraphData
{
    public int Id { get; set; }
    
    /// <summary>
    /// Graf ismi
    /// </summary>
    public string Name { get; set; } = string.Empty;
    
    /// <summary>
    /// Graf açıklaması
    /// </summary>
    public string? Description { get; set; }
    
    /// <summary>
    /// Oluşturulma tarihi
    /// </summary>
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    /// <summary>
    /// Son güncellenme tarihi
    /// </summary>
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}