namespace sna_data.Entities;

/// <summary>
/// Sosyal ağdaki bir kullanıcıyı/düğümü temsil eder
/// </summary>
public class Node
{
    /// <summary>
    /// Birincil anahtar - Düğüm ID
    /// </summary>
    public int Id { get; set; }
    
    /// <summary>
    /// Düğüm ismi/etiketi
    /// </summary>
    public string Name { get; set; } = string.Empty;
    
    /// <summary>
    /// Canvas üzerindeki X koordinatı
    /// </summary>
    public double PositionX { get; set; }
    
    /// <summary>
    /// Canvas üzerindeki Y koordinatı
    /// </summary>
    public double PositionY { get; set; }
    
    // --- Dinamik Ağırlık Hesaplama Özellikleri (CSV'den gelecek) ---
    
    /// <summary>
    /// Özellik I - Aktiflik değeri (0-1 arası)
    /// </summary>
    public double Aktiflik { get; set; }
    
    /// <summary>
    /// Özellik II - Etkileşim sayısı
    /// </summary>
    public int Etkilesim { get; set; }
    
    /// <summary>
    /// Özellik III - Bağlantı sayısı (Degree)
    /// </summary>
    public int BaglantiSayisi { get; set; }
    
    /// <summary>
    /// Ek açıklama/notlar
    /// </summary>
    public string? Description { get; set; }
    
    /// <summary>
    /// Graf renklendirme algoritması için renk kodu
    /// </summary>
    public string? Color { get; set; }
    
    /// <summary>
    /// Hesaplanan merkezilik değeri (Degree Centrality)
    /// </summary>
    public double? Centrality { get; set; }
    
    /// <summary>
    /// Oluşturulma tarihi
    /// </summary>
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    /// <summary>
    /// Bu düğümün kaynak olduğu kenarlar (giden bağlantılar)
    /// </summary>
    public ICollection<Edge> OutgoingEdges { get; set; } = new List<Edge>();
    
    /// <summary>
    /// Bu düğümün hedef olduğu kenarlar (gelen bağlantılar)
    /// </summary>
    public ICollection<Edge> IncomingEdges { get; set; } = new List<Edge>();
}