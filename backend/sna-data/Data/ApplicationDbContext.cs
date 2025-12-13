using Microsoft.EntityFrameworkCore;
using sna_data.Entities;

namespace sna_data.Data;

/// <summary>
/// Veritabanı bağlantısını ve tabloları yöneten DbContext
/// </summary>
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
        : base(options)
    {
    }
    
    // Tablolar (DbSet)
    public DbSet<Node> Nodes { get; set; }
    public DbSet<Edge> Edges { get; set; }
    public DbSet<GraphData> Graphs { get; set; }
    
    /// <summary>
    /// Tablo ilişkilerini ve kısıtlamaları yapılandırır
    /// </summary>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Node tablosu yapılandırması
        modelBuilder.Entity<Node>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Aktiflik).HasDefaultValue(0.5);
            
            // Index - hızlı arama için
            entity.HasIndex(e => e.Name);
        });
        
        // Edge tablosu yapılandırması
        modelBuilder.Entity<Edge>(entity =>
        {
            entity.HasKey(e => e.Id);
            
            // İlişkiler (Foreign Keys)
            entity.HasOne(e => e.SourceNode)
                .WithMany(n => n.OutgoingEdges)
                .HasForeignKey(e => e.SourceNodeId)
                .OnDelete(DeleteBehavior.Restrict);
            
            entity.HasOne(e => e.TargetNode)
                .WithMany(n => n.IncomingEdges)
                .HasForeignKey(e => e.TargetNodeId)
                .OnDelete(DeleteBehavior.Restrict);
            
            // Aynı düğüm çiftinde birden fazla bağlantı olmamalı
            entity.HasIndex(e => new { e.SourceNodeId, e.TargetNodeId })
                .IsUnique();
        });
        
        // GraphData tablosu
        modelBuilder.Entity<GraphData>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
        });
    }
}