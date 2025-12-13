namespace sna_bootstrapper_api.Models;

/// <summary>
/// İstemciye döndüğümüz kenar modeli. Hesaplanmış Weight değerini içerir.
/// </summary>
public class EdgeDto
{
    public int Id { get; set; }
    public int SourceNodeId { get; set; }
    public int TargetNodeId { get; set; }
    public double Weight { get; set; }
    public int? InteractionCount { get; set; }
}
