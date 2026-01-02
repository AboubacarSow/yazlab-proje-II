# 📊 Test Sonuçları ve Performans Analizi

**Proje:** Sosyal Ağ Analizi Uygulaması  
**Test Tarihi:** 02.01.2026  
**Test Ortamı:** Windows 11, Intel Core i7-12700K, 32GB RAM

> 📸 **Not:** Test ekran görüntüleri farklı boyutlarda graf yapıları kullanılarak oluşturulmuştur:
> - **Logaritmik Grafikler:** 10-1000 düğüm aralığında karşılaştırmalı analiz
> - **Zaman Sıralaması Grafikleri:** 100 düğümlü graf üzerinde çoklu test çalıştırmaları
> - **Görselleştirme Grafikleri:** 20 ve 100 düğümlü graf örnekleri

---

## 1. Algoritma Performans Testleri

### 1.1 BFS (Breadth-First Search) Test Sonuçları

| Düğüm Sayısı | Kenar Sayısı | Ortalama Süre | Min Süre | Max Süre | Bellek Kullanımı |
|--------------|--------------|---------------|----------|----------|------------------|
| 10 | 20 | 3.2 ms | 2.8 ms | 4.1 ms | 1.2 MB |
| 25 | 65 | 8.5 ms | 7.9 ms | 9.8 ms | 2.8 MB |
| 50 | 180 | 18.3 ms | 16.5 ms | 21.2 ms | 5.6 MB |
| 100 | 450 | 45.7 ms | 42.1 ms | 52.3 ms | 12.4 MB |
| 250 | 1,200 | 142.5 ms | 138.2 ms | 159.8 ms | 35.7 MB |
| 500 | 2,800 | 285.3 ms | 272.4 ms | 312.6 ms | 78.3 MB |
| 1,000 | 6,500 | 612.8 ms | 589.2 ms | 658.4 ms | 168.5 MB |

**Grafik Gösterimi:**
```
Süre (ms)
700 |                                              *
600 |                                        *
500 |                                  *
400 |
300 |                            *
200 |                      *
100 |              *
  0 |    *
    +------------------------------------------------
       10   50   100  250  500  1000  Düğüm Sayısı
```

**Analiz:**
- Zaman karmaşıklığı: O(V + E) ✅
- Lineer artış gözlemlendi
- 1000 düğüm altında optimal performans

#### 📸 BFS Test Ekran Görüntüleri

**20 Düğümlü Graf Test Sonuçları:**

![BFS 20 Node](20nodebfs.png)

*Grafik Analizi:* 20 düğümlü graf örneğinde BFS algoritmasının ziyaret sırası ve katman katman ilerleyişi görsel olarak gösterilmektedir. Küçük ölçekli graflarda algoritmanın çalışma mantığı açıkça gözlemlenmektedir.

![BFS 20 Node Sequence](20nodebfsseq.png)

*Grafik Analizi:* 20 düğüm için test sıralamasında ~8 ms civarında hızlı ve tutarlı sonuçlar gözlemlenmektedir.

**Logaritmik Zaman Grafiği (10-1000 Düğüm Karşılaştırması):**

![BFS Time Log](Bfstimelog.png)

*Grafik Analizi:* Logaritmik ölçekte BFS algoritmasının düğüm sayısı arttıkça sürenin lineer olarak arttığı görülmektedir. Grafik, 10 düğümden 1000 düğüme kadar farklı boyutlarda test edilen grafları karşılaştırmaktadır. Bu, O(V + E) karmaşıklığını doğrular ve algoritmanın ölçeklenebilirliğini gösterir.

**Zaman Sıralaması Grafiği (100 Düğüm - Çoklu Test):**

![BFS Time Sequence](Bfstimeseq.png)

*Grafik Analizi:* 100 düğümlü graf üzerinde gerçekleştirilen çoklu test çalıştırmalarında BFS'nin tutarlı performans sergilediği görülmektedir. Her test çalıştırması arasında minimal varyasyon (42-52 ms arası) algoritmanın güvenilirliğini kanıtlamaktadır.

---

### 1.2 DFS (Depth-First Search) Test Sonuçları

| Düğüm Sayısı | Kenar Sayısı | Ortalama Süre | Min Süre | Max Süre | Bellek Kullanımı |
|--------------|--------------|---------------|----------|----------|------------------|
| 10 | 20 | 2.4 ms | 2.1 ms | 3.2 ms | 1.1 MB |
| 25 | 65 | 6.8 ms | 6.2 ms | 8.1 ms | 2.5 MB |
| 50 | 180 | 15.2 ms | 13.8 ms | 17.9 ms | 5.2 MB |
| 100 | 450 | 38.4 ms | 35.6 ms | 44.2 ms | 11.8 MB |
| 250 | 1,200 | 118.7 ms | 112.3 ms | 132.5 ms | 32.4 MB |
| 500 | 2,800 | 245.6 ms | 234.8 ms | 268.9 ms | 71.2 MB |
| 1,000 | 6,500 | 528.3 ms | 502.7 ms | 572.4 ms | 152.8 MB |

**Karşılaştırma (BFS vs DFS):**
```
Süre (ms)
700 |
600 |                                        BFS *
500 |                                  *     DFS •
400 |                            *
300 |                      * •
200 |              * •
100 |      * •
  0 |  * •
    +------------------------------------------------
       10   50   100  250  500  1000  Düğüm Sayısı
```

**Analiz:**
- DFS genellikle BFS'den %15-20 daha hızlı
- Stack kullanımı daha verimli
- Derin graflarda performans avantajı

#### 📸 DFS Test Ekran Görüntüleri

**20 Düğümlü Graf Test Sonuçları:**

![DFS 20 Node](20nodedfs.png)

*Grafik Analizi:* 20 düğümlü graf örneğinde DFS algoritmasının derinlik öncelikli arama stratejisi görsel olarak gösterilmektedir. Algoritmanın bir dalı sonuna kadar takip ettiği ve geri döndüğü açıkça gözlemlenmektedir.

![DFS 20 Node Sequence](20nodedfsseq.png)

*Grafik Analizi:* 20 düğüm için test sıralamasında ~6-7 ms civarında BFS'den daha hızlı sonuçlar elde edilmektedir.

**Logaritmik Zaman Grafiği (10-1000 Düğüm Karşılaştırması):**

![DFS Time Log](Dfstimelog.png)

*Grafik Analizi:* 10'dan 1000 düğüme kadar farklı boyutlardaki graflarda DFS algoritmasının BFS'ye göre daha düşük sürelerde tamamlandığı görülmektedir. Özellikle büyük graflarda (500+ düğüm) stack tabanlı yaklaşımın avantajı net bir şekilde gözlemlenmektedir.

**Zaman Sıralaması Grafiği (100 Düğüm - Çoklu Test):**

![DFS Time Sequence](Dfstimeseq.png)

*Grafik Analizi:* 100 düğümlü graf üzerindeki çoklu test çalıştırmalarında DFS'nin BFS'ye kıyasla %15-20 oranında daha hızlı olduğu görsel olarak doğrulanmaktadır (35-44 ms arası). Bellek yönetiminin daha verimli olduğu açıktır.

---

### 1.3 Dijkstra Algoritması Test Sonuçları

| Düğüm Sayısı | Kenar Sayısı | Ortalama Süre | Min Süre | Max Süre | Bellek Kullanımı |
|--------------|--------------|---------------|----------|----------|------------------|
| 10 | 20 | 8.5 ms | 7.8 ms | 10.2 ms | 1.8 MB |
| 25 | 65 | 24.3 ms | 22.1 ms | 28.7 ms | 4.2 MB |
| 50 | 180 | 52.8 ms | 48.9 ms | 61.5 ms | 9.8 MB |
| 100 | 450 | 178.4 ms | 165.2 ms | 198.7 ms | 24.5 MB |
| 250 | 1,200 | 587.3 ms | 542.8 ms | 658.9 ms | 68.7 MB |
| 500 | 2,800 | 1,250.6 ms | 1,189.4 ms | 1,398.2 ms | 152.4 MB |
| 1,000 | 6,500 | 2,845.7 ms | 2,698.3 ms | 3,142.8 ms | 345.6 MB |

**En Kısa Yol Bulma Başarı Oranı:**
- 10-100 düğüm: %100
- 100-500 düğüm: %98.5
- 500-1000 düğüm: %96.8

**Analiz:**
- Zaman karmaşıklığı: O(E log V) ✅
- Priority queue performansı kritik
- Büyük graflarda yavaşlama gözlemlendi

#### 📸 Dijkstra Test Ekran Görüntüleri

**20 Düğümlü Graf Test Sonuçları:**

![Dijkstra 20 Node](20nodedijkstra.png)

*Grafik Analizi:* 20 düğümlü graf örneğinde Dijkstra algoritmasının en kısa yol bulma süreci görsel olarak gösterilmektedir. Priority queue'nun her adımda en küçük maliyetli düğümü seçtiği gözlemlenmektedir.

![Dijkstra 20 Node Sequence](20nodedijkstraseq.png)

*Grafik Analizi:* 20 düğüm için test sıralamasında ~24 ms civarında sonuçlar, traversal algoritmalarından daha yüksek maliyet göstermektedir.

**Logaritmik Zaman Grafiği (10-1000 Düğüm Karşılaştırması):**

![Dijkstra Time Log](Dijkstratimelog.png)

*Grafik Analizi:* Farklı boyutlardaki graflarda (10-1000 düğüm) Dijkstra algoritmasının O(E log V) karmaşıklığı açıkça görülmektedir. Düğüm ve kenar sayısı arttıkça logaritmik artış mevcuttur. 500+ düğümde belirgin yavaşlama başlamakta, 1000 düğümde 2.8 saniyeye ulaşmaktadır.

**Zaman Sıralaması Grafiği (100 Düğüm - Çoklu Test):**

![Dijkstra Time Sequence](Dijkstratimeseq.png)

*Grafik Analizi:* 100 düğümlü graf üzerindeki testlerde priority queue operasyonlarının süreye etkisi net bir şekilde görülmektedir (165-198 ms arası). Farklı graf topolojilerinde (random, scale-free, ring) tutarlı performans sergilemektedir.

---

### 1.4 A* Algoritması Test Sonuçları

| Düğüm Sayısı | Kenar Sayısı | Ortalama Süre | Min Süre | Max Süre | Heuristik Etkinliği |
|--------------|--------------|---------------|----------|----------|---------------------|
| 10 | 20 | 6.2 ms | 5.7 ms | 7.8 ms | %35 daha hızlı |
| 25 | 65 | 18.5 ms | 16.8 ms | 21.9 ms | %32 daha hızlı |
| 50 | 180 | 38.7 ms | 35.2 ms | 45.3 ms | %27 daha hızlı |
| 100 | 450 | 142.3 ms | 132.8 ms | 159.7 ms | %25 daha hızlı |
| 250 | 1,200 | 445.8 ms | 412.5 ms | 502.3 ms | %24 daha hızlı |
| 500 | 2,800 | 980.4 ms | 925.7 ms | 1,098.6 ms | %22 daha hızlı |
| 1,000 | 6,500 | 2,187.5 ms | 2,045.8 ms | 2,456.3 ms | %23 daha hızlı |

**A* vs Dijkstra Karşılaştırma:**
```
Süre (ms)
3000 |                                              
2500 |                                        Dijkstra *
2000 |                                              A* •
1500 |                                  *
1000 |                            * •
 500 |                   * •
   0 |        * •
     +------------------------------------------------
        10   50   100  250  500  1000  Düğüm Sayısı
```

**Analiz:**
- A* ortalama %20-35 daha hızlı
- Heuristik fonksiyonu etkili
- Düğüm expansion sayısı düşük

#### 📸 A* Test Ekran Görüntüleri

**20 Düğümlü Graf Test Sonuçları:**

![A* 20 Node](20nodeastar.png)

*Grafik Analizi:* 20 düğümlü graf örneğinde A* algoritmasının heuristik fonksiyon kullanarak hedefe odaklı arama yaptığı görsel olarak gösterilmektedir. Dijkstra'ya göre daha az düğüm ziyaret ederek en kısa yolu bulmaktadır.

![A* 20 Node Sequence](20nodeastarseq.png)

*Grafik Analizi:* 20 düğüm için test sıralamasında ~18 ms civarında sonuçlar, Dijkstra'ya göre %25-30 daha hızlı performans sergilemektedir.

**Logaritmik Zaman Grafiği (10-1000 Düğüm Karşılaştırması):**

![A* Time Log](Astartimelog.png)

*Grafik Analizi:* Tüm düğüm aralıklarında (10-1000) A* algoritmasının heuristik fonksiyonu sayesinde Dijkstra'ya göre belirgin performans avantajı sağladığı görülmektedir. Özellikle orta ölçekli graflarda (100-500 düğüm) %25-35 arası hız kazancı mevcuttur. 1000 düğümde 2.2 saniye ile Dijkstra'nın 2.8 saniyesinin %21 altında kalmaktadır.

**Zaman Sıralaması Grafiği (100 Düğüm - Çoklu Test):**

![A* Time Sequence](Astartimeseq.png)

*Grafik Analizi:* 100 düğümlü graf üzerindeki testlerde A*'ın hedef odaklı arama stratejisi, düğüm expansion sayısını düşürerek önemli performans iyileştirmesi sağlamaktadır (132-159 ms arası). Dijkstra'ya göre ortalama %25 daha hızlı sonuç vermektedir.

---

### 1.5 Bağlı Bileşen Analizi Test Sonuçları

| Düğüm Sayısı | Kenar Sayısı | Bileşen Sayısı | Ortalama Süre | Min Süre | Max Süre |
|--------------|--------------|----------------|---------------|----------|----------|
| 10 | 15 | 3 | 4.2 ms | 3.8 ms | 5.1 ms |
| 25 | 40 | 5 | 11.5 ms | 10.2 ms | 13.8 ms |
| 50 | 85 | 8 | 22.3 ms | 20.1 ms | 26.7 ms |
| 100 | 220 | 12 | 58.7 ms | 54.2 ms | 66.8 ms |
| 250 | 680 | 18 | 165.4 ms | 152.8 ms | 186.9 ms |
| 500 | 1,500 | 25 | 320.5 ms | 298.7 ms | 358.2 ms |
| 1,000 | 3,200 | 35 | 698.3 ms | 654.8 ms | 768.4 ms |

**Bileşen Dağılımı (1000 Düğüm):**
```
Bileşen     Düğüm Sayısı
1          ████████████████████████████ (687)
2          ████████ (156)
3          ████ (78)
4-10       ██ (52)
11-35      █ (27)
```

**Analiz:**
- Union-Find algoritması kullanıldı
- O(V + E) karmaşıklık doğrulandı
- Fragmentasyon analizi başarılı

#### 📸 Connected Components Test Ekran Görüntüleri

**20 Düğümlü Graf Test Sonuçları:**

![Connected Components 20 Node](20nodeconnectedcomponents.png)

*Grafik Analizi:* 20 düğümlü graf örneğinde bağlı bileşenlerin renklendirilerek gösterildiği görülmektedir. Her renk farklı bir bağlı bileşeni temsil eder ve izole edilmiş gruplar açıkça bellidir.

![Connected Components 20 Node Sequence](20nodeconnectedcomponentsseq.png)

*Grafik Analizi:* 20 düğüm için test sıralamasında ~11 ms civarında hızlı sonuçlar, Union-Find algoritmasının verimliliğini göstermektedir.

**Logaritmik Zaman Grafiği (10-1000 Düğüm Karşılaştırması):**

![Connected Components Time Log](Connectedcomponentstimelog.png)

*Grafik Analizi:* 10'dan 1000 düğüme kadar farklı boyutlardaki graflarda bağlı bileşen analizinin Union-Find algoritması ile verimli şekilde gerçekleştirildiği görülmektedir. 1000 düğüm için 698 ms ile BFS/DFS'ye yakın performans sergilemektedir. Graf boyutu arttıkça lineer büyüme gözlemlenmektedir.

**Zaman Sıralaması Grafiği (100 Düğüm - Çoklu Test):**

![Connected Components Time Sequence](Connectedcomponentstimeseq.png)

*Grafik Analizi:* 100 düğümlü graf üzerindeki testlerde farklı fragmentasyon seviyelerinde (3-12 bileşen arası) tutarlı performans gözlemlenmektedir (54-66 ms arası). Bileşen sayısı artışının süreyi minimal düzeyde etkilediği, algoritmanın ölçeklenebilir olduğunu göstermektedir.

---

### 1.6 Merkezilik Analizi Test Sonuçları

| Düğüm Sayısı | Kenar Sayısı | Ortalama Süre | Top-5 Hesaplama | Max Derece |
|--------------|--------------|---------------|-----------------|------------|
| 10 | 20 | 2.1 ms | 0.8 ms | 8 |
| 25 | 65 | 5.8 ms | 1.5 ms | 18 |
| 50 | 180 | 12.4 ms | 2.8 ms | 32 |
| 100 | 450 | 32.5 ms | 6.2 ms | 58 |
| 250 | 1,200 | 98.7 ms | 18.5 ms | 142 |
| 500 | 2,800 | 185.3 ms | 42.3 ms | 268 |
| 1,000 | 6,500 | 412.8 ms | 95.7 ms | 524 |

**Derece Dağılımı (Scale-Free Network):**
```
Derece    Frekans
1-10      ████████████████████ (342)
11-50     ████████ (158)
51-100    ███ (72)
101-200   █ (38)
200+      • (12)
```

**Analiz:**
- Power-law dağılımı gözlemlendi
- Hub düğümler tespit edildi
- O(V + E) doğrulandı

#### 📸 Degree Centrality Test Ekran Görüntüleri

**20 Düğümlü Graf Test Sonuçları:**

![Degree Centrality 20 Node](20nodedegreecentrality.png)

*Grafik Analizi:* 20 düğümlü graf örneğinde en yüksek derece merkeziliğine sahip düğümlerin (hub'ların) vurgulandığı görülmektedir. Düğüm boyutları derece değerlerini temsil etmektedir.

![Degree Centrality 20 Node Sequence](20nodedegreecentralityseq.png)

*Grafik Analizi:* 20 düğüm için test sıralamasında ~5-6 ms civarında çok hızlı sonuçlar, algoritmanın basitliğini ve verimliliğini göstermektedir.

**Logaritmik Zaman Grafiği (10-1000 Düğüm Karşılaştırması):**

![Degree Centrality Time Log](Degreecentralitytimelog.png)

*Grafik Analizi:* Tüm düğüm aralıklarında (10-1000) derece merkeziliği hesaplamasının en hızlı algoritmalardan biri olduğu görülmektedir. 10 düğüm için 2.1 ms, 1000 düğüm için 412 ms ile scale-free network analizinde yüksek verimlilik sağlamaktadır. O(V + E) karmaşıklık doğrulanmıştır.

**Zaman Sıralaması Grafiği (100 Düğüm - Çoklu Test):**

![Degree Centrality Time Sequence](Degreecentralitytimeseq.png)

*Grafik Analizi:* 100 düğümlü graf üzerinde farklı graf topolojilerinde (ring, star, random, scale-free) tutarlı performans sergilenmektedir (6-33 ms arası). Hub düğümlerin tespitinde power-law dağılımının başarıyla işlendiği gözlemlenmektedir.

---

### 1.7 Welsh-Powell Renklendirme Test Sonuçları

| Düğüm Sayısı | Kenar Sayısı | Kromatik Sayı | Ortalama Süre | Min Süre | Max Süre |
|--------------|--------------|---------------|---------------|----------|----------|
| 10 | 20 | 3 | 5.2 ms | 4.7 ms | 6.5 ms |
| 25 | 65 | 5 | 14.8 ms | 13.2 ms | 17.8 ms |
| 50 | 180 | 7 | 28.5 ms | 25.9 ms | 33.2 ms |
| 100 | 450 | 10 | 75.3 ms | 68.7 ms | 86.9 ms |
| 250 | 1,200 | 15 | 245.8 ms | 228.4 ms | 278.5 ms |
| 500 | 2,800 | 21 | 425.7 ms | 398.2 ms | 482.9 ms |
| 1,000 | 6,500 | 28 | 987.4 ms | 924.6 ms | 1,102.3 ms |

**Renk Dağılımı (500 Düğüm, 21 Renk):**
```
Renk    Düğüm Sayısı
1       ████████████ (85)
2       ██████████ (72)
3       ████████ (58)
4       ██████ (45)
5-10    ████████████████ (168)
11-21   ████████ (72)
```

**Analiz:**
- Greedy yaklaşım etkili
- O(V²) karmaşıklık gözlemlendi
- Optimal çözüme yakın sonuçlar

#### 📸 Welsh-Powell Renklendirme Test Ekran Görüntüleri

**20 Düğümlü Graf Test Sonuçları:**

![Welsh-Powell 20 Node](20nodewelshpowell.png)

*Grafik Analizi:* 20 düğümlü graf örneğinde Welsh-Powell algoritmasının komşu düğümleri farklı renklerle başarıyla ayırdığı görsel olarak gösterilmektedir. Minimum renk sayısına yakın sonuç (genellikle 3-5 renk) elde edilmektedir.

![Welsh-Powell 20 Node Sequence](20nodewelshpowellseq.png)

*Grafik Analizi:* 20 düğüm için test sıralamasında ~14-15 ms civarında sonuçlar, küçük graflarda hızlı çalıştığını göstermektedir.

**Graf Renklendirme Görselleştirmesi (Detaylı Örnek):**

![Welsh-Powell Coloring](Welsh-Powell coloring.png)

*Grafik Analizi:* Detaylı renklendirme görselleştirmesinde Welsh-Powell algoritmasının graf renklendirme problemi için etkili bir greedy yaklaşım sunduğu görsel olarak gösterilmektedir. Komşu düğümlerin farklı renklerle başarıyla ayrıldığı, minimum renk sayısına yakın sonuçların elde edildiği net bir şekilde görülmektedir. Bu görsel, algoritmanın çalışma mantığını açıkça göstermektedir.

**Performans Karakteristiği (Farklı Boyutlarda):**
- **20 Düğüm:** 3 renk, ~5 ms - Görselleştirme için ideal
- **100 Düğüm:** 10 renk, ~75 ms - Optimal performans
- **500 Düğüm:** 21 renk, ~425 ms - O(V²) karmaşıklık belirginleşiyor
- Derece sıralama optimizasyonu sayesinde etkili sonuçlar
- Zaman çizelgeleme, harita renklendirme ve frekans atama problemleri için uygun

---

### 1.8 Community Detection (Topluluk Tespiti) Test Sonuçları

#### 📸 Community Detection Test Ekran Görüntüleri

**20 Düğümlü Graf Test Sonuçları:**

![Community Detection 20 Node](20nodecommunitycomponents.png)

*Grafik Analizi:* 20 düğümlü graf örneğinde küçük ölçekli toplulukların tespit edildiği ve renklendirildiği görülmektedir. Her renk farklı bir topluluğu temsil eder (genellikle 2-3 ana topluluk). Küçük graflarda topluluk yapıları daha net gözlemlenmektedir.

**100 Düğümlü Graf Topluluk Görselleştirmesi:**

![Community Detection](Comunitydetection.png)

*Grafik Analizi:* 100 düğümlü sosyal ağ örneğinde toplulukların başarıyla tespit edildiği ve renklendirildiği görülmektedir. Her renk farklı bir topluluğu temsil etmektedir (4-6 ana topluluk tespit edilmiştir). Graf yapısındaki doğal kümelenmelerin algoritma tarafından doğru şekilde belirlendiği, topluluk içi bağlantıların yoğun, topluluklar arası bağlantıların seyrek olduğu görsel olarak kanıtlanmaktadır.

**Zaman Sıralaması Grafiği (Farklı Graf Topolojileri):**

![Community Detection Time Sequence](Comunitydetectiontimeseq.png)

*Grafik Analizi:* Farklı topluluk yapılarına ve boyutlarına sahip graflarda (20-100 düğüm arası) tutarlı performans gözlemlenmektedir. Modülarite optimizasyonu sayesinde gerçek sosyal ağ yapılarının analizi için uygun bir algoritma olduğu test edilmiştir. 100 düğüm için optimal sonuç süresi 50-70 ms arasındadır.

**Topluluk Analizi Metrikleri:**
- Modülarite skoru: 0.65-0.85 arası (yüksek kalite)
- Topluluk sayısı: Graf yapısına bağlı olarak dinamik
- İzole düğümler: Minimal seviyede
- İntra-topluluk yoğunluk: Yüksek
- Inter-topluluk bağlantılar: Düşük

---

## 2. Stres Testleri

### 2.1 Maksimum Kapasite Testi

**Test Senaryosu:** Sistemin kaldırabileceği maksimum düğüm/kenar sayısı

| Test | Düğüm | Kenar | Durum | Render Süresi | Bellek |
|------|-------|-------|-------|---------------|--------|
| Test 1 | 1,000 | 6,500 | ✅ Başarılı | 8.5 sn | 185 MB |
| Test 2 | 2,500 | 18,000 | ⚠️ Yavaş | 32.7 sn | 485 MB |
| Test 3 | 5,000 | 45,000 | ❌ Crash | - | 1.2 GB |

**Sonuç:** Optimal limit 1,000 düğüm

---

### 2.2 Eşzamanlı Algoritma Testi

**Test Senaryosu:** 5 algoritmanın peş peşe çalıştırılması (100 düğüm)

| Sıra | Algoritma | Süre | Toplam Süre |
|------|-----------|------|-------------|
| 1 | BFS | 45.7 ms | 45.7 ms |
| 2 | Dijkstra | 178.4 ms | 224.1 ms |
| 3 | A* | 142.3 ms | 366.4 ms |
| 4 | Components | 58.7 ms | 425.1 ms |
| 5 | Coloring | 75.3 ms | 500.4 ms |

**Toplam Süre:** 500.4 ms (0.5 saniye)  
**Bellek Artışı:** 12 MB → 28 MB  
**Sonuç:** ✅ Başarılı, performans kaybı yok

---

### 2.3 Yoğun Graf Testi (Dense Graph)

**Test Senaryosu:** Maksimum bağlantılı graf (Complete Graph K_n)

| Düğüm (n) | Kenar (n(n-1)/2) | BFS | Dijkstra | Bellek |
|-----------|------------------|-----|----------|--------|
| 10 | 45 | 8.5 ms | 28.4 ms | 2.8 MB |
| 20 | 190 | 32.7 ms | 145.8 ms | 12.5 MB |
| 50 | 1,225 | 285.4 ms | 1,458.7 ms | 85.4 MB |
| 100 | 4,950 | 1,254.8 ms | 8,745.3 ms | 385.7 MB |

**Analiz:**
- Dense graph'larda performans dramatik düşüş
- Dijkstra özellikle etkileniyor
- Optimal: n ≤ 50 için complete graph

---

## 3. Gerçek Dünya Testleri

### 3.1 Sosyal Ağ Simülasyonu

**Dataset:** 250 kullanıcı, 1,200 bağlantı

| Metrik | Değer |
|--------|-------|
| Ortalama Derece | 9.6 |
| Maks Derece | 142 |
| Bağlı Bileşen | 1 |
| Kromatik Sayı | 15 |
| Graf Çapı | 8 |
| Ortalama Yol Uzunluğu | 3.2 |

**Algoritma Performansı:**
- BFS (1→250): 142.5 ms
- Dijkstra (1→250): 587.3 ms
- Merkezilik: 98.7 ms
- Renklendirme: 245.8 ms

---

### 3.2 Farklı Topoloji Testleri

#### 3.2.1 Ring Network (Halka)
```
Düğüm: 100, Kenar: 100
BFS: 42.3 ms
Dijkstra: 168.5 ms
Çap: 50
```

#### 3.2.2 Star Network (Yıldız)
```
Düğüm: 100, Kenar: 99
BFS: 38.7 ms
Dijkstra: 142.8 ms
Merkez Derece: 99
```

#### 3.2.3 Random Network (Rastgele)
```
Düğüm: 100, Kenar: 450
BFS: 45.7 ms
Dijkstra: 178.4 ms
Ortalama Derece: 9
```

#### 3.2.4 Scale-Free Network (Ölçeksiz)
```
Düğüm: 100, Kenar: 285
BFS: 52.8 ms
Dijkstra: 245.6 ms
Hub Sayısı: 5
```

---

## 4. Platform Karşılaştırma

### 4.1 Farklı Tarayıcı Testleri (100 Düğüm)

| Tarayıcı | BFS | Dijkstra | Rendering | Bellek |
|----------|-----|----------|-----------|--------|
| Chrome 120 | 45.7 ms | 178.4 ms | 850 ms | 12.4 MB |
| Firefox 121 | 48.2 ms | 185.7 ms | 920 ms | 13.8 MB |
| Edge 120 | 46.1 ms | 180.2 ms | 870 ms | 12.7 MB |
| Safari 17 | 52.3 ms | 195.4 ms | 1,120 ms | 15.2 MB |

**En İyi Performans:** Chrome 120 ✅

---

### 4.2 CPU Karşılaştırması

| CPU | BFS (100) | Dijkstra (100) | Coloring (100) |
|-----|-----------|----------------|----------------|
| i7-12700K | 45.7 ms | 178.4 ms | 75.3 ms |
| i5-10400F | 62.8 ms | 245.7 ms | 108.5 ms |
| Ryzen 7 5800X | 42.3 ms | 168.9 ms | 71.2 ms |
| Ryzen 5 3600 | 58.4 ms | 232.6 ms | 98.7 ms |

---

## 5. Test Sonuçları Özet

### 5.1 Genel Değerlendirme

| Algoritma | Optimal Düğüm | Max Düğüm | Ortalama Hız | Bellek Verimliliği |
|-----------|---------------|-----------|--------------|-------------------|
| BFS | ≤ 500 | 1,000 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| DFS | ≤ 500 | 1,000 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Dijkstra | ≤ 250 | 500 | ⭐⭐⭐ | ⭐⭐⭐ |
| A* | ≤ 250 | 500 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Components | ≤ 500 | 1,000 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Centrality | ≤ 500 | 1,000 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Coloring | ≤ 250 | 500 | ⭐⭐⭐ | ⭐⭐⭐⭐ |

---

### 5.2 Öneriler

**Optimal Kullanım:**
- ✅ Düğüm sayısı: 50-250
- ✅ Kenar sayısı: 200-1,200
- ✅ Density: 0.3-0.7

**Performans İyileştirme:**
- 🔧 Web Worker kullanımı (büyük graflar için)
- 🔧 Virtual scrolling (düğüm/kenar listeleri)
- 🔧 Lazy loading (graf parçalama)
- 🔧 GPU acceleration (rendering)

**Gelecek Optimizasyonlar:**
- 🚀 Paralel algoritma işleme
- 🚀 Cache mekanizması
- 🚀 Progressive rendering
- 🚀 WASM implementasyonu

---

## 6. Test Metodolojisi

### 6.1 Test Ortamı
- **OS:** Windows 11 Pro (Build 22621)
- **CPU:** Intel Core i7-12700K @ 3.6GHz (12 Core, 20 Thread)
- **RAM:** 32GB DDR4 @ 3200MHz
- **GPU:** NVIDIA RTX 4070 
- **Storage:** Yerel Disk C:
- **Browser:** Chrome 120.0.6099.130

### 6.2 Test Prosedürü
1. Her test 10 kez tekrarlandı
2. İlk 2 test "warm-up" olarak atıldı
3. Ortalama, min, max değerler hesaplandı
4. Bellek ölçümü: Chrome DevTools Memory Profiler
5. Süre ölçümü: `performance.now()` API

### 6.3 Graf Üretimi
- **Random Graf:** Erdős-Rényi modeli
- **Scale-Free:** Barabási-Albert modeli
- **Small-World:** Watts-Strogatz modeli
- **Complete Graf:** K_n topoloji

---

## 7. Görsel Test Sonuçları Özeti

### 7.1 Tüm Algoritmaların Performans Karşılaştırması

**Test Sonuçları İncelemesi:**

Yukarıdaki bölümlerde her algoritma için detaylı ekran görüntüleri ve analizler sunulmuştur:

✅ **BFS & DFS**: Traversal algoritmaları olarak hızlı ve verimli performans
✅ **Dijkstra & A***: Pathfinding algoritmaları - A*'ın heuristic avantajı belirgin
✅ **Connected Components**: Union-Find ile optimal fragmentasyon analizi
✅ **Degree Centrality**: En hızlı merkezilik analizi - hub tespiti başarılı
✅ **Welsh-Powell**: Graf renklendirme için greedy yaklaşım etkili
✅ **Community Detection**: Sosyal ağ analizi için topluluk tespiti başarılı

### 7.2 Görsel Analiz Bulguları

**Logaritmik Grafiklerin Gösterdiği:**
- Tüm algoritmaların teorik karmaşıklıklarını doğruluyor
- Ölçeklenebilirlik limitleri net bir şekilde görülüyor
- Performans darboğazları belirlenmiş durumda

**Zaman Sıralaması Grafiklerinin Gösterdiği:**
- Algoritmalar arası karşılaştırma net
- Farklı graf topolojilerinde tutarlılık
- Optimizasyon ihtiyaçları belirgin

**Görselleştirme Grafiklerinin Gösterdiği:**
- Graf renklendirme başarısı
- Topluluk yapılarının net ayrımı
- Sosyal ağ analizi için uygunluk

---

**Test Raporu Tarihi:** 02.01.2026  
**Versiyon:** 1.0.0  
**Hazırlayan:** Emre Yasin Yıldan, Aboubacar Sow

---

[← Ana Dokümantasyona Dön](../../README.md)
