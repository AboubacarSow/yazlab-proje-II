sna-data/
├── Entities/
│   ├── Node.cs          (Düğüm)
│   ├── Edge.cs          (Bağlantı)
│   └── GraphData.cs     (Graf metadata)
├── Enums/
│   └── NodeStatus.cs

-- Bu 3 dosyayı sna-data/Entities/ klasörüne ekle.

OOP Prensipleri:

✅ Encapsulation: Property'ler ile veri saklama
✅ Single Responsibility: Her sınıf tek bir şeyi temsil ediyor
✅ Clear Naming: Anlamlı isimler
✅ Documentation: XML yorumları ile açıklamalar


Entity Framework Paketlerini Kur
sna-data projesine Entity Framework eklemen lazım. Terminal'de:
- cd backend/sna-data
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Design

EF Tools'u Kur
dotnet tool install --global dotnet-ef

 Migration Oluştur
 cd ..
dotnet ef migrations add InitialCreate --project sna-data --startup-project sna-bootstrapper-api


Veritabanı kuruldu. Yaptıklarımız:

sna-bootstrapper-api projesine Microsoft.EntityFrameworkCore.Design (9.0.1) eklendi.
dotnet restore çalıştı.
Var olan 20251213091105_InitialCreate migrasyonu uygulandı: dotnet ef database update --project sna-data --startup-project sna-bootstrapper-api ➜ SnaGraphDb oluşturuldu, Nodes, Edges, Graphs tabloları kuruldu.

1) Repository katmanı (sna-application)

Interfaces/INodeRepository, IEdgeRepository, IGraphRepository: CRUD imzaları, Task tabanlı async.
Repositories/NodeRepository, EdgeRepository, GraphRepository: ApplicationDbContext kullanan EF Core implementasyonu.
Validation: self-loop engelle (SourceNodeId != TargetNodeId), çift kenar engelle (varsa ekleme).
2) Service katmanı (sna-application)

INodeService, IEdgeService, IGraphService.
İş kuralları:
Node eklerken Name zorunlu, Aktiflik [0,1], ağırlık özellikleri boşsa default 0.
Edge eklerken node’lar var mı kontrol, duplicate ve self-loop engelle.
Kenar ağırlığı formülü: Weight = 1 / (1 + sqrt((ΔAktiflik)^2 + (ΔEtkilesim)^2 + (ΔBaglanti)^2)).
3) DTO ve Mapper (sna-bootstrapper-api)

Request/response DTO’ları: NodeCreateDto, NodeDto, EdgeCreateDto, EdgeDto.
Basit manuel mapping ya da AutoMapper (küçük proje için manuel yeter).
Model validation: [Required], [Range].
4) API Controller’ları (sna-bootstrapper-api/Controllers)

NodesController: GET (liste/id), POST, PUT, DELETE.
EdgesController: GET (liste/id), POST, DELETE. PUT opsiyonel (ağırlık/güncelleme).
Hata durumları: 400 (validasyon), 404 (bulunamadı), 409 (duplicate edge).
5) Algoritma servisi (sna-application/Algorithms)

Arayüz: IGraphAlgorithms (BFS, DFS, Dijkstra, A*, ConnectedComponents, DegreeCentralityTop5, WelshPowell).
Uygulama: Grafı repository’den çekip adjacency list oluştur, ağırlıklar Edge.Weight.
Sonuç modelleri: kısa yol listesi, bileşenler listesi, merkezilik tablosu, renklendirme tablosu.
6) API Algoritma Controller’ı

AlgorithmsController: Her algoritma için ayrı endpoint:
POST /algorithms/bfs (startNodeId)
POST /algorithms/dfs
POST /algorithms/dijkstra (source, target)
POST /algorithms/astar
GET /algorithms/components
GET /algorithms/centrality/top5
GET /algorithms/coloring
Sonuçları tablo+list formatında döndür (frontend kolay işlesin).
7) Veri içe/dışa aktarma (CSV/JSON)

Service: IImportExportService
ImportCsv(nodesCsv, edgesCsv) → node’ları ekle, edge ağırlıklarını formülle hesapla.
ExportJson()/ExportCsv() → node listesi + adjacency list/matrix.
API: ImportExportController ile endpoint’ler.
8) Frontend’e hazırlık (Angular)

npm install.
API URL’yi environment.ts’e koy.
İlk etapta: Node/Edge listesi + ekleme/silme formları; algoritma çağrı butonları; sonuçları tablo olarak göster.
Graf çizimi için sonraki adım: Cytoscape.js veya D3.
Öncelik sırası (tavsiye): 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8.
Başlamak için “Repository + Service + Node/Edge Controller” üçlüsünü istersen birlikte yazalım; belirt, ekleyelim.