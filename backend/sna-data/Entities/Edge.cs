namespace sna_data.Entities;

/// <summary>
/// İki düğüm arasındaki bağlantıyı (kenar) temsil eder
/// Yönsüz ve ağırlıklı graf
/// </summary>
public class Edge
{
    /// <summary>
    /// Birincil anahtar - Bağlantı ID
    /// </summary>
    public int Id { get; set; }
    
    /// <summary>
    /// Kaynak düğüm ID
    /// </summary>
    public int SourceNodeId { get; set; }
    
    /// <summary>
    /// Hedef düğüm ID
    /// </summary>
    public int TargetNodeId { get; set; }
    
    /// <summary>
    /// Dinamik olarak hesaplanan ağırlık değeri
    /// Formül: 1 / (1 + sqrt(farklarınKareleriToplamı))
    /// </summary>
    public double Weight { get; set; }
    
    /// <summary>
    /// Etkileşim sayısı (opsiyonel - manuel girilebilir)
    /// </summary>
    public int? InteractionCount { get; set; }
    
    /// <summary>
    /// Graf yönsüz olduğu için bu alan false
    /// </summary>
    public bool IsDirected { get; set; } = false;
    
    /// <summary>
    /// Oluşturulma tarihi
    /// </summary>
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation properties
    
    /// <summary>
    /// Kaynak düğüm
    /// </summary>
    public Node SourceNode { get; set; } = null!;
    
    /// <summary>
    /// Hedef düğüm
    /// </summary>
    public Node TargetNode { get; set; } = null!;
}