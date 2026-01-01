<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stars][stars-shield]][stars-url]

<!-- BADGE LINKS -->
[contributors-shield]: https://img.shields.io/github/contributors/AboubacarSow/yazlab-proje-II?style=for-the-badge
[contributors-url]: https://github.com/AboubacarSow/yazlab-proje-II/graphs/contributors

[forks-shield]: https://img.shields.io/github/forks/AboubacarSow/yazlab-proje-II?style=for-the-badge
[forks-url]: https://github.com/AboubacarSow/yazlab-proje-II/network/members

[stars-shield]: https://img.shields.io/github/stars/AboubacarSow/yazlab-proje-II?style=for-the-badge
[stars-url]: https://github.com/AboubacarSow/yazlab-proje-II/stargazers


# Sosyal Ağ Analizi Uygulaması
**Üniversite:** Kocaeli Üniversitesi  
**Bölüm:** Bilişim Sistemleri Mühendisliği – Teknoloji Fakültesi   
**Ders:** Yazılım Geliştirme Laboratuvarı-I  
**Proje:** Proje – 2  
**Tarih:** 02.01.2026

### 👥 Ekip Üyeleri

| İsim Soyisim        | Öğrenci Numarası |  
|---------------------|------------------|
| Emre Yasin Yıldan   | 231307058        |
| Aboubacar Sow       | 221307117        |


---

## 1. Giriş

Sosyal ağlar, bireyler veya varlıklar arasındaki ilişkilerin modellenmesi ve analiz edilmesi açısından önemli veri kaynaklarıdır. Bu projede, kullanıcılar arasındaki ilişkileri bir **graf veri yapısı** ile temsil eden ve çeşitli **graf algoritmaları** yardımıyla bu yapıyı analiz eden etkileşimli bir **Sosyal Ağ Analizi Uygulaması** geliştirilmiştir.

Projenin temel amacı; graf teorisi, algoritma analizi, nesne yönelimli programlama (OOP), veri saklama ve görselleştirme konularının bütünleşik olarak uygulanmasıdır.

---

## 2. Problemin Tanımı ve Amaç

Problem, kullanıcılar ve aralarındaki etkileşimlerden oluşan bir sosyal ağın dinamik olarak yönetilmesi ve analiz edilmesidir. Kullanıcıların:

* Ağ üzerindeki konumları,
* Birbirleriyle olan mesafeleri,
* Topluluk yapıları,
* En etkili düğümleri

graf algoritmaları yardımıyla belirlenmektedir.

Amaç, bu analizleri hem **görsel** hem de **sayısal** olarak sunabilen, kullanıcı etkileşimine açık bir yazılım geliştirmektir.

---

## 3. Kullanılan Algoritmalar

### 3.1 BFS (Breadth First Search)
#### Çalışma Mantığı    

Breadth First Search (BFS), bir graf üzerinde seçilen başlangıç düğümünden itibaren düğümleri **katman (seviye)** bazlı olarak ziyaret eden bir arama algoritmasıdır. Algoritma, başlangıç düğümüne en yakın düğümleri önce ziyaret eder ve daha sonra bir sonraki seviyeye geçer.

BFS algoritması, ziyaret sırasını koruyabilmek için **kuyruk (Queue)** veri yapısını kullanır. Her düğüm yalnızca bir kez ziyaret edilir ve ziyaret edilen düğümlerin komşuları sırayla kuyruğa eklenir.

Bu özellikleri sayesinde BFS, özellikle **erişilebilirlik analizi** ve **ağırlıksız graflarda en kısa yolun bulunması** problemlerinde etkin bir şekilde kullanılmaktadır.


**Zaman Karmaşıklığı:** O(V + E)
Burada:

V: Düğüm (vertex) sayısı

E: Kenar (edge) sayısı

### BFS (Breadth First Search)
```mermaid
flowchart TD
    A[Başlangıç Düğümünü Seç] --> B[Düğümü Ziyaret Et]
    B --> C[Kuyruğa Ekle]
    C --> D{Kuyruk Boş mu?}
    D -->|Hayır| E[Kuyruktan Düğüm Çıkar]
    E --> F[Ziyaret Edilmemiş Komşuları Bul]
    F --> G[Komşuları Ziyaret Et ve Kuyruğa Ekle]
    G --> D
    D -->|Evet| H[Bitiş]
```
### Literatür İncelemesi 

BFS algoritması, ilk kez **E. F. Moore (1959)** tarafından tanımlanmış olup, daha sonra **Cormen, Leiserson, Rivest ve Stein** tarafından yazılan Introduction to Algorithms adlı eserde detaylı biçimde ele alınmıştır. Günümüzde BFS, sosyal ağ analizi, ağ güvenliği ve yapay zekâ alanlarında yaygın olarak kullanılmaktadır.

---

### 3.2 DFS (Depth First Search)
#### Çalışma Mantığı  

Depth First Search (DFS), bir graf üzerinde verilen başlangıç düğümünden başlayarak mümkün olduğunca **derine inerek** arama yapan bir algoritmadır. Algoritma, bir düğümün tüm komşularını ziyaret etmeden geri dönmez.

DFS algoritması, **özyineleme (recursive)** yaklaşımıyla veya **yığın (Stack)** veri yapısı kullanılarak gerçekleştirilebilir. Bu yapı, algoritmanın derinlik öncelikli çalışmasını sağlar.

DFS, özellikle **bağlı bileşenlerin bulunması, çevrim (cycle) tespiti** ve **topolojik sıralama** gibi problemlerde etkili sonuçlar üretmektedir.

**Zaman Karmaşıklığı:** O(V + E)

V: Düğüm (vertex) sayısı

E: Kenar (edge) sayısı 

### DFS (Depth First Search)
```mermaid
flowchart TD
    A[Başlangıç Düğümünü Seç] --> B[Düğümü Ziyaret Et]
    B --> C[Ziyaret Edilmemiş Komşu Seç]
    C --> D{Komşu Var mı?}
    D -->|Evet| B
    D -->|Hayır| E[Geri Dön]
    E --> F{Gidilecek Başka Düğüm Var mı?}
    F -->|Evet| B
    F -->|Hayır| G[Bitiş]
```
### Literatür İncelemesi   

DFS algoritması, graf teorisinin temel algoritmalarından biri olup **Robert Tarjan** tarafından geliştirilen çalışmalarla yaygınlaşmıştır. DFS, Introduction to Algorithms (Cormen et al.) ve Algorithms (Sedgewick & Wayne) gibi temel kaynaklarda ayrıntılı olarak açıklanmaktadır.

---

### 3.3 Dijkstra Algoritması

#### Çalışma Mantığı

Dijkstra algoritması, **ağırlıklı ve negatif olmayan kenarlara sahip** bir graf üzerinde, seçilen bir başlangıç düğümünden diğer tüm düğümlere olan **en kısa yolları** hesaplayan bir algoritmadır.

Algoritma, her adımda başlangıç düğümüne olan uzaklığı en küçük olan ve henüz ziyaret edilmemiş düğümü seçer. Seçilen düğümün komşularına olan mesafeler güncellenir ve bu işlem tüm düğümler ziyaret edilene kadar devam eder.

Bu projede Dijkstra algoritması, düğümler arasındaki **dinamik olarak hesaplanan kenar ağırlıkları** kullanılarak iki düğüm arasındaki en kısa yolun bulunması amacıyla kullanılmıştır.

**Zaman Karmaşıklığı:** O(E log V)

V: Düğüm (vertex) sayısı

E: Kenar (edge) sayısı 

### Dijkstra Akış Diyagramı

```mermaid
flowchart TD
    A[Başlangıç Düğümünü Seç] --> B[Tüm Mesafeleri Sonsuz Yap]
    B --> C[Başlangıç Mesafesini 0 Yap]
    C --> D{Ziyaret Edilmemiş Düğüm Var mı?}
    D -->|Evet| E[En Küçük Mesafeli Düğümü Seç]
    E --> F[Komşuların Mesafelerini Güncelle]
    F --> G[Düğümü Ziyaret Edildi Olarak İşaretle]
    G --> D
    D -->|Hayır| H[Bitiş]
```
### Literatür İncelemesi

Dijkstra algoritması, **Edsger W. Dijkstra** tarafından 1956 yılında geliştirilmiştir. Algoritma, A Note on Two Problems in Connexion with Graphs adlı çalışmada tanıtılmış ve daha sonra Introduction to Algorithms (Cormen et al.) gibi temel kaynaklarda detaylandırılmıştır. Günümüzde ağ yönlendirme protokolleri ve sosyal ağ analizlerinde yaygın olarak kullanılmaktadır.

---

### 3.4 A* Algoritması
#### Çalışma Mantığı

A* algoritması, Dijkstra algoritmasının geliştirilmiş bir versiyonu olup, en kısa yolu bulma sürecini hızlandırmak amacıyla sezgisel (heuristic) bir fonksiyon kullanır.

Algoritma, her düğüm için aşağıdaki maliyet fonksiyonunu hesaplar:

f(n) = g(n) + h(n)

Burada:

g(n): Başlangıç düğümünden mevcut düğüme olan gerçek maliyet

h(n): Mevcut düğümden hedef düğüme olan tahmini maliyet

A* algoritması, hedefe daha yakın olduğu tahmin edilen düğümleri öncelikli olarak ziyaret ederek arama süresini azaltır.

Bu projede A* algoritması, dinamik ağırlıklar kullanılarak iki düğüm arasındaki en kısa yolun daha hızlı bulunması için kullanılmıştır.

**Zaman Karmaşıklığı:** O(E)

### A* Algoritması  

```mermaid
flowchart TD

    A[Başlangıç ve Hedef Düğümü Belirle] --> B[Başlangıç f Değerini Hesapla] 
    B --> C{Açık Liste Boş mu?}  
    C -->|Hayır| D[En Küçük f Değerli Düğümü Seç]
    D --> E[Düğüm Hedef mi?]
    E -->|Evet| F[Yolu Oluştur ve Bitir]
    E -->|Hayır| G[Komşular için g, h, f Hesapla]
    G --> H[Açık Listeyi Güncelle]
    H --> C
    C -->|Evet| I[Yol Bulunamadı]
```

### Literatür İncelemesi

A* algoritması, **Peter Hart, Nils Nilsson** ve **Bertram Raphael** tarafından 1968 yılında geliştirilmiştir. Algoritma, A Formal Basis for the Heuristic Determination of Minimum Cost Paths adlı çalışmada tanıtılmıştır. Günümüzde oyun geliştirme, yapay zekâ ve yol bulma problemlerinde yaygın olarak kullanılmaktadır.

---

### 3.5 Bağlı Bileşen Analizi

Graf içerisindeki ayrık alt toplulukların tespit edilmesini sağlar.

---

### 3.6 Merkezilik (Degree Centrality)

Düğümlerin bağlantı sayılarına göre en etkili kullanıcılar belirlenir. En yüksek dereceye sahip ilk 5 düğüm tablo halinde sunulmuştur.

---

### 3.7 Welsh–Powell Graf Renklendirme

Komşu düğümlerin farklı renkler almasını sağlayarak toplulukları görsel olarak ayırır.

```mermaid
flowchart LR
A[Düğümleri Dereceye Göre Sırala] --> B[Renk Ata]
B --> C[Komşuları Kontrol Et]
C --> D{Çakışma Var mı?}
D -->|Evet| B
D -->|Hayır| E[Devam]
```

---

## 4. Sistem Tasarımı ve Mimari

### 4.1 Genel Mimari Yapı

Proje, modern web uygulaması mimarisine uygun olarak **Backend** ve **Frontend** olmak üzere iki ana katmandan oluşmaktadır.

```mermaid
graph TB
    subgraph Frontend[Frontend - Angular]
        UI[User Interface Components]
        Services[Services Layer]
        Models[Models & DTOs]
    end
    
    subgraph Backend[Backend - .NET Core]
        API[API Layer]
        Application[Application Layer]
        Domain[Domain Layer]
        Infrastructure[Infrastructure Layer]
    end
    
    subgraph Database[Database]
        DB[(PostgreSQL)]
    end
    
    UI --> Services
    Services --> Models
    Services -->|HTTP/REST| API
    API --> Application
    Application --> Domain
    Application --> Infrastructure
    Infrastructure --> DB
```

---

### 4.2 Backend Sınıf Yapısı (Domain-Driven Design)

Backend katmanı, **Domain-Driven Design (DDD)** prensipleri ile tasarlanmıştır.

#### 4.2.1 Domain Layer - Varlıklar (Entities)

```mermaid
classDiagram
    class BaseEntity {
        <<abstract>>
        +Guid Id
        +DateTime CreatedAt
        +DateTime? UpdatedAt
    }
    
    class Node {
        +int Id
        +Guid GraphId
        +string Tag
        +double Activity
        +double Interaction
        +Graph Graph
        +ICollection~Edge~ OutgoingEdges
        +ICollection~Edge~ IncomingEdges
    }
    
    class Edge {
        +int NodeAId
        +int NodeBId
        +double Weight
        +Node NodeA
        +Node NodeB
    }
    
    class Graph {
        +Guid Id
        +string Title
        +string Description
        +ICollection~Node~ Nodes
        +ICollection~Edge~ Edges
        +int NodeCount()
        +int EdgeCount()
    }
    
    class Message {
        +Guid Id
        +string SenderName
        +string ReceiverName
        +string Content
        +DateTime SentAt
    }
    
    BaseEntity <|-- Graph
    Graph "1" *-- "many" Node : contains
    Graph "1" *-- "many" Edge : contains
    Node "1" -- "many" Edge : source
    Node "1" -- "many" Edge : target
```

**Açıklama:**
- **BaseEntity**: Tüm entity'lerin ortak özelliklerini içerir (Id, CreatedAt, UpdatedAt)
- **Graph**: Ana graf yapısı, düğümleri ve kenarları barındırır
- **Node**: Graf içindeki düğümleri temsil eder (kullanıcılar)
- **Edge**: Düğümler arası bağlantıları temsil eder
- **Message**: Kullanıcılar arası mesajlaşma bilgisi

---

#### 4.2.2 Application Layer - CQRS Pattern

```mermaid
classDiagram
    class ICommand {
        <<interface>>
    }
    
    class IQuery~TResponse~ {
        <<interface>>
    }
    
    class CreateGraphCommand {
        +string Title
        +string Description
    }
    
    class AddNodeCommand {
        +Guid GraphId
        +string Tag
        +double Activity
        +double Interaction
    }
    
    class AddEdgeCommand {
        +Guid GraphId
        +int NodeAId
        +int NodeBId
    }
    
    class GetGraphByIdQuery {
        +Guid GraphId
    }
    
    class RunBFSQuery {
        +Guid GraphId
        +int StartNodeId
    }
    
    class RunDijkstraQuery {
        +Guid GraphId
        +int SourceId
        +int TargetId
    }
    
    ICommand <|.. CreateGraphCommand
    ICommand <|.. AddNodeCommand
    ICommand <|.. AddEdgeCommand
    IQuery <|.. GetGraphByIdQuery
    IQuery <|.. RunBFSQuery
    IQuery <|.. RunDijkstraQuery
```

**Açıklama:**
- **Commands**: Veri değiştirme işlemleri (Create, Update, Delete)
- **Queries**: Veri okuma işlemleri (Get, Search, Algorithm Results)
- **CQRS Pattern**: Komut ve sorgu sorumluluklarının ayrılması

---

#### 4.2.3 Domain Services - Algoritma Servisleri

```mermaid
classDiagram
    class AlgorithmService {
        +BFSResult RunBFS(Guid graphId, int startNodeId)
        +DFSResult RunDFS(Guid graphId, int startNodeId)
        +PathResult RunDijkstra(Guid graphId, int source, int target)
        +PathResult RunAStar(Guid graphId, int source, int target)
        +ComponentsResult FindConnectedComponents(Guid graphId)
        +CentralityResult CalculateDegreeCentrality(Guid graphId)
        +ColoringResult RunWelshPowell(Guid graphId)
        -double CalculateEdgeWeight(Node a, Node b)
        -double CalculateHeuristic(Node current, Node target)
    }
    
    class BFSResult {
        +List~int~ VisitOrder
        +Dictionary~int,int~ ParentMap
        +double ExecutionTime
    }
    
    class PathResult {
        +List~int~ Path
        +List~EdgeSnapshot~ EdgesTraversed
        +double TotalCost
        +double ExecutionTime
    }
    
    class ComponentsResult {
        +List~List~int~~ Components
        +int ComponentCount
        +double ExecutionTime
    }
    
    class CentralityResult {
        +Dictionary~int,int~ NodeDegrees
        +int MaxDegree
        +double ExecutionTime
    }
    
    class ColoringResult {
        +Dictionary~int,int~ NodeColors
        +int ChromaticNumber
        +double ExecutionTime
    }
    
    AlgorithmService --> BFSResult
    AlgorithmService --> PathResult
    AlgorithmService --> ComponentsResult
    AlgorithmService --> CentralityResult
    AlgorithmService --> ColoringResult
```

**Açıklama:**
- **AlgorithmService**: Tüm graf algoritmalarının iş mantığını içerir
- **Result Classes**: Her algoritmanın sonucunu yapılandırılmış şekilde döner
- **Dynamic Weight Calculation**: Düğüm özellikleri kullanılarak kenar ağırlıkları dinamik hesaplanır

---

### 4.3 Frontend Sınıf Yapısı (Angular)

#### 4.3.1 Angular Modül Yapısı

```mermaid
graph TB
    subgraph Core[Core Module]
        Services[Services]
        Utils[Utils & Helpers]
        Validators[Validators]
    end
    
    subgraph Features[Feature Modules]
        Workspace[Workspace Module]
        UserInterface[User Interface Module]
        Landing[Landing Module]
        Auth[Authentication Module]
    end
    
    subgraph Shared[Shared Resources]
        Models[Models & Interfaces]
        Pipes[Pipes]
        Components[Shared Components]
    end
    
    App[App Module] --> Core
    App --> Features
    App --> Shared
    
    Workspace --> GraphView[Graph View]
    Workspace --> DataView[Data View]
    Workspace --> Sidebar[Sidebar]
    Workspace --> Header[Header]
```

---

#### 4.3.2 Frontend Services Katmanı

```mermaid
classDiagram
    class GraphStateService {
        -BehaviorSubject~Graph~ currentGraph$
        +getCurrentGraph() Graph
        +setCurrentGraph(graph: Graph)
        +createGraph(title: string)
        +loadGraph(graphId: Guid)
        +exportGraph()
        +importGraph(file: File)
    }
    
    class NodesService {
        -HttpClient http
        +addNode(tag, activity, interaction)
        +editNode(nodeId, tag, activity, interaction)
        +deleteNode(nodeId)
        +getNodes(graphId)
    }
    
    class EdgesService {
        -HttpClient http
        +addEdge(sourceId, targetId)
        +deleteEdge(sourceId, targetId)
        +getEdges(graphId)
    }
    
    class AlgorithmsService {
        -HttpClient http
        +runBFS(graphId, startNodeId)
        +runDFS(graphId, startNodeId)
        +runDijkstra(graphId, sourceId, targetId)
        +runAStar(graphId, sourceId, targetId)
        +getConnectedComponents(graphId)
        +runDegreeCentrality(graphId)
        +runWelshPowellColoring(graphId)
    }
    
    class GraphRenderService {
        -D3 simulation
        -ForceGraph3D renderer
        +init(container: HTMLElement)
        +setData(nodes, links)
        +renderTraversal(result)
        +renderShortestPath(path)
        +renderColoring(colors)
        +enableNodeSelection(options)
        +enterEdgeMode()
    }
    
    GraphStateService --> NodesService
    GraphStateService --> EdgesService
    GraphRenderService --> GraphStateService
    AlgorithmsService --> GraphRenderService
```

**Açıklama:**
- **GraphStateService**: Graf durumunu yönetir (State Management)
- **NodesService/EdgesService**: CRUD operasyonları için HTTP istekleri
- **AlgorithmsService**: Algoritma API çağrıları
- **GraphRenderService**: D3.js ve Force Graph ile görselleştirme

---

#### 4.3.3 Frontend Components Yapısı

```mermaid
classDiagram
    class WorkspaceComponent {
        +currentView: string
        +switchView(view: string)
    }
    
    class GraphViewComponent {
        -renderer: GraphRenderService
        -algorithmState: AlgorithmsStateService
        +ngAfterViewInit()
        +onNodesSelected(nodeIds)
        +enableEdgeCreation()
        +createEdge(source, target)
    }
    
    class NodeAddComponent {
        +form: FormGroup
        +create()
        +cancel()
    }
    
    class NodeEditComponent {
        +data: NodeEditData
        +form: FormGroup
        +save()
    }
    
    class NodeListComponent {
        +nodes: Node[]
        +currentGraph: Graph
        +startEdit(node)
        +deleteNode(nodeId)
    }
    
    class EdgeListComponent {
        +edges: Edge[]
        +getAvailableNodesForA()
        +getAvailableNodesForB()
        +createEdge()
        +deleteEdge(sourceId, targetId)
    }
    
    class SidebarComponent {
        +algorithms: AlgorithmDefinition[]
        +selectAlgorithm(algo)
        +runBFS()
        +runDijkstra()
        +runColoring()
    }
    
    WorkspaceComponent *-- GraphViewComponent
    WorkspaceComponent *-- SidebarComponent
    GraphViewComponent ..> NodeAddComponent
    GraphViewComponent ..> NodeEditComponent
    SidebarComponent --> GraphViewComponent
```

**Açıklama:**
- **Standalone Components**: Angular 15+ standalone component mimarisi
- **Dialog System**: CDK Dialog ile modal yönetimi
- **Reactive Forms**: Form validasyonu ve veri bağlama
- **RxJS Observables**: Asenkron veri akışı yönetimi

---

#### 4.3.4 Models ve Interfaces

```mermaid
classDiagram
    class Graph {
        +Guid id
        +string title
        +string description
        +Node[] nodes
        +Edge[] edges
    }
    
    class Node {
        +int id
        +Guid graphId
        +string tag
        +double activity
        +double interaction
    }
    
    class Edge {
        +int nodeAId
        +int nodeBId
        +double weight
    }
    
    class AlgorithmDefinition {
        +string key
        +string label
        +AlgorithmCategory category
        +boolean requiresStartNode
        +boolean requiresEndNode
        +boolean animated
    }
    
    class AlgorithmResult {
        +number[] visitOrder
        +EdgeSnapshot[] edgesTraversed
        +number executionTime
    }
    
    Graph "1" *-- "many" Node
    Graph "1" *-- "many" Edge
    AlgorithmDefinition --> AlgorithmResult
```

---

### 4.4 API Endpoint Yapısı

```mermaid
graph TB
    API[REST API Endpoints]
    
    API --> Graphs[📊 Graphs API]
    API --> Nodes[🔵 Nodes API]
    API --> Edges[🔗 Edges API]
    API --> Algorithms[⚡ Algorithms API]
    
    Graphs --> G1["POST / - Graf Oluştur"]
    Graphs --> G2["GET /{id} - Graf Getir"]
    Graphs --> G3["PUT /{id} - Graf Güncelle"]
    Graphs --> G4["DELETE /{id} - Graf Sil"]
    Graphs --> G5["POST /import - Graf İçe Aktar"]
    Graphs --> G6["GET /{id}/export - Graf Dışa Aktar"]
    
    Nodes --> N1["POST / - Düğüm Ekle"]
    Nodes --> N2["PUT /{id} - Düğüm Güncelle"]
    Nodes --> N3["DELETE /{id} - Düğüm Sil"]
    
    Edges --> E1["POST / - Kenar Ekle"]
    Edges --> E2["DELETE / - Kenar Sil"]
    
    Algorithms --> A1["POST /bfs - BFS Algoritması"]
    Algorithms --> A2["POST /dfs - DFS Algoritması"]
    Algorithms --> A3["POST /dijkstra - Dijkstra"]
    Algorithms --> A4["POST /astar - A* Algoritması"]
    Algorithms --> A5["GET /components - Bağlı Bileşenler"]
    Algorithms --> A6["GET /centrality - Merkezilik Analizi"]
    Algorithms --> A7["GET /coloring - Graf Renklendirme"]
```

---

### 4.5 Veri Akışı Diyagramı

```mermaid
sequenceDiagram
    participant User
    participant UI as Angular UI
    participant Service as Service Layer
    participant API as REST API
    participant App as Application Layer
    participant Domain as Domain Service
    participant DB as Database
    
    User->>UI: Graf Oluştur
    UI->>Service: createGraph(title)
    Service->>API: POST /api/graphs
    API->>App: CreateGraphCommand
    App->>Domain: Create Graph Entity
    Domain->>DB: INSERT
    DB-->>Domain: Graph Created
    Domain-->>App: Graph Response
    App-->>API: GraphDto
    API-->>Service: HTTP 200
    Service-->>UI: Observable<Graph>
    UI-->>User: Graf Oluşturuldu
    
    User->>UI: Algoritma Çalıştır (BFS)
    UI->>Service: runBFS(graphId, startNode)
    Service->>API: POST /api/algorithms/bfs
    API->>App: RunBFSQuery
    App->>Domain: AlgorithmService.RunBFS()
    Domain->>Domain: BFS Execution
    Domain-->>App: BFSResult
    App-->>API: BFSResultDto
    API-->>Service: HTTP 200
    Service-->>UI: Observable<Result>
    UI->>UI: Render Visualization
    UI-->>User: Sonuç Gösterildi
```

---

### 4.6 Teknoloji Stack'i

#### Backend
- **.NET 8.0**: Modern, performanslı backend framework
- **Entity Framework Core**: ORM ve veritabanı yönetimi
- **PostgreSQL**: İlişkisel veritabanı
- **MediatR**: CQRS pattern implementasyonu
- **Serilog**: Yapılandırılmış loglama

#### Frontend
- **Angular 19**: Modern web framework
- **TypeScript**: Tip güvenli programlama
- **RxJS**: Reactive programming
- **D3.js**: Veri görselleştirme
- **Force-Graph**: 3D graf görselleştirme
- **Tailwind CSS**: Utility-first CSS framework

---

## 5. Veri Saklama ve Dinamik Ağırlık Hesaplama

Veriler JSON ve CSV formatında saklanmaktadır. Düğümler arası kenar ağırlıkları aşağıdaki formüle göre dinamik olarak hesaplanmaktadır:

```
Ağırlık(i,j) = 1 / (1 + (Ai-Aj)^2 + (Ei-Ej)^2 + (Bi-Bj)^2)
```

Bu yapı sayesinde benzer özelliklere sahip düğümler arasında daha güçlü bağlar oluşturulmaktadır.

---

## 6. Kullanıcı Arayüzü

* Canvas tabanlı grafik gösterimi
* Düğüm ve kenar ekleme/silme
* Algoritmaların tek tek çalıştırılması
* Sonuçların tablo ve grafik olarak sunulması

---

## 7. Testler ve Performans Analizi

| Algoritma | Düğüm Sayısı | Süre (ms) |
| --------- | ------------ | --------- |
| BFS       | 20           | 5         |
| DFS       | 20           | 4         |
| Dijkstra  | 50           | 30        |
| A*        | 50           | 22        |

Algoritmalar küçük ve orta ölçekli graflarda makul sürelerde çalışmıştır.

---

## 8. Sonuç ve Tartışma

Bu projede, sosyal ağ analizine yönelik kapsamlı bir uygulama geliştirilmiştir. Graf algoritmaları başarıyla uygulanmış, görselleştirme ile desteklenmiştir.

### Başarılar

* OOP prensiplerine uygun mimari
* Dinamik ağırlık hesaplama
* Etkileşimli kullanıcı arayüzü

### Sınırlılıklar

* Büyük ölçekli graflarda performans sınırlamaları

### Gelecek Çalışmalar

* Daha büyük veri setleri için optimizasyon
* Merkeziyet ölçütlerinin çeşitlendirilmesi
* Web tabanlı sürüm geliştirilmesi

---

## 9. Kaynakça

* [https://github.com/mermaid-js/mermaid](https://github.com/mermaid-js/mermaid)
* [https://www.markdownguide.org/](https://www.markdownguide.org/)
* Graf Teorisi ve Algoritmalar – Cormen et al.

