import { Component, OnInit, inject } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GraphStateService } from '../../../core/services/graph.service';
import { EdgesService } from '../../../core/services/edges.service';
import { Edge } from '../../../models/edge.model';
import { Graph } from '../../../models/graph.model';
import { GraphNode } from '../../../models/node.model';

export interface EdgeListData { mode: 'add' | 'delete'; }

@Component({
  selector: 'app-edge-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './edge-list.component.html',
  styleUrls: ['./edge-list.component.css']
})
export class EdgeListComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialogRef = inject(DialogRef);
  private graphState = inject(GraphStateService);
  private edgesService = inject(EdgesService);
  private data = inject<EdgeListData>(DIALOG_DATA, { optional: true });
  mode: 'add' | 'delete';
  edges: { edge: Edge; nodeA?: GraphNode; nodeB?: GraphNode }[] = [];
  currentGraph: Graph | null = null;
  showAddForm = false;
  loading = false;
  error?: string;
  deletingEdgeId?: number;

  form: FormGroup;

  constructor() {
    // Mode'u data'dan al, yoksa 'add' olarak ayarla
    this.mode = this.data?.mode ?? 'add';
    
    this.form = this.fb.group({
      nodeAId: [null, [Validators.required]],
      nodeBId: [null, [Validators.required]],
    });
  }

  selectedNodeAId: number | null = null;
  selectedNodeBId: number | null = null;

  ngOnInit(): void {
    // Mode'u tekrar kontrol et (data inject edilmiş olabilir)
    if (this.data) {
      this.mode = this.data.mode;
    }
    this.loadEdges();
    // Add mode için formu otomatik aç
    if (this.mode === 'add') {
      this.showAddForm = true;
    }

    // Form değerlerini dinle
    this.form.valueChanges.subscribe(values => {
      this.selectedNodeAId = values.nodeAId;
      this.selectedNodeBId = values.nodeBId;
    });
  }

  loadEdges(): void {
    this.graphState.loadCurrentGraphFromStorage();
    this.currentGraph = this.graphState.getCurrentGraph();
    
    if (!this.currentGraph) {
      this.error = 'Aktif bir graph yok. Önce graph oluşturun veya içe aktarın.';
      return;
    }

    const nodes = this.currentGraph.nodes ?? [];
    const edgeList = this.currentGraph.edges ?? [];

    this.edges = edgeList.map(edge => {
      const nodeA = nodes.find(n => n.id === edge.nodeAId);
      const nodeB = nodes.find(n => n.id === edge.nodeBId);
      return { edge, nodeA, nodeB };
    });
  }

  get nodes(): GraphNode[] {
    return this.currentGraph?.nodes ?? [];
  }

  /**
   * Belirli bir node ile edge oluşturulabilir mi kontrol et
   * Her zaman güncel graph state'den kontrol eder
   */
  canCreateEdge(nodeAId: number | null, nodeBId: number | null): boolean {
    if (!nodeAId || !nodeBId || nodeAId === nodeBId) {
      return false;
    }

    // Graph state'den güncel edge'leri al
    this.graphState.loadCurrentGraphFromStorage();
    const currentGraph = this.graphState.getCurrentGraph();
    if (!currentGraph) {
      return false;
    }

    const currentEdges = currentGraph.edges ?? [];

    // Mevcut edge'leri kontrol et (undirected graph - her iki yön de kontrol edilir)
    // Backend'de NodeAId < NodeBId kuralı var, bu yüzden her iki yönü de kontrol et
    const existingEdge = currentEdges.find(edge => {
      const minId = Math.min(nodeAId, nodeBId);
      const maxId = Math.max(nodeAId, nodeBId);
      const edgeMinId = Math.min(edge.nodeAId, edge.nodeBId);
      const edgeMaxId = Math.max(edge.nodeAId, edge.nodeBId);
      
      // Backend'de edge'ler her zaman min < max şeklinde saklanır
      return edgeMinId === minId && edgeMaxId === maxId;
    });

    if (existingEdge) {
      console.log('🔍 Edge already exists:', {
        requested: { nodeAId, nodeBId },
        existing: { nodeAId: existingEdge.nodeAId, nodeBId: existingEdge.nodeBId }
      });
    }

    return !existingEdge;
  }

  /**
   * Node B için uygun seçenekleri filtrele (Node A seçildikten sonra)
   */
  getAvailableNodesForB(): GraphNode[] {
    const nodeAId = this.selectedNodeAId ?? this.form.value.nodeAId;
    if (!nodeAId) {
      return this.nodes;
    }

    return this.nodes.filter(node => {
      if (node.id === nodeAId) {
        return false; // Aynı node olamaz
      }
      // Zaten var olan edge'leri filtrele
      return this.canCreateEdge(nodeAId, node.id);
    });
  }

  /**
   * Node A için uygun seçenekleri filtrele (Node B seçildikten sonra)
   */
  getAvailableNodesForA(): GraphNode[] {
    const nodeBId = this.selectedNodeBId ?? this.form.value.nodeBId;
    if (!nodeBId) {
      return this.nodes;
    }

    return this.nodes.filter(node => {
      if (node.id === nodeBId) {
        return false; // Aynı node olamaz
      }
      // Zaten var olan edge'leri filtrele
      return this.canCreateEdge(node.id, nodeBId);
    });
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    this.error = undefined;
    if (!this.showAddForm) {
      this.form.reset();
    }
  }

  addEdge(): void {
    if (this.form.invalid) {
      this.error = 'Lütfen tüm alanları doğru doldurunuz.';
      return;
    }

    const nodeAId = Number(this.form.value.nodeAId);
    const nodeBId = Number(this.form.value.nodeBId);

    if (!nodeAId || !nodeBId) {
      this.error = 'Lütfen her iki node\'u da seçiniz.';
      return;
    }

    if (nodeAId === nodeBId) {
      this.error = 'Aynı node arasında edge oluşturulamaz.';
      return;
    }

    // Graph state'den güncel edge'leri kontrol et
    this.graphState.loadCurrentGraphFromStorage();
    const currentGraph = this.graphState.getCurrentGraph();
    if (currentGraph) {
      const currentEdges = currentGraph.edges ?? [];
      
      // Backend'de NodeAId < NodeBId kuralı var, bu yüzden her iki yönü de kontrol et
      const minId = Math.min(nodeAId, nodeBId);
      const maxId = Math.max(nodeAId, nodeBId);
      
      const existingEdge = currentEdges.find(edge => {
        const edgeMinId = Math.min(edge.nodeAId, edge.nodeBId);
        const edgeMaxId = Math.max(edge.nodeAId, edge.nodeBId);
        return edgeMinId === minId && edgeMaxId === maxId;
      });

      if (existingEdge) {
        // Node bilgilerini bul
        const nodes = currentGraph.nodes ?? [];
        const nodeA = nodes.find(n => n.id === nodeAId);
        const nodeB = nodes.find(n => n.id === nodeBId);
        const nodeATag = nodeA?.tag ?? `Node ${nodeAId}`;
        const nodeBTag = nodeB?.tag ?? `Node ${nodeBId}`;
        console.log('⚠️ Edge already exists check:', {
          nodeAId, nodeBId,
          existingEdge: { nodeAId: existingEdge.nodeAId, nodeBId: existingEdge.nodeBId },
          currentEdgesCount: currentEdges.length
        });
        this.error = `${nodeATag} ve ${nodeBTag} arasında zaten bir edge bulunmaktadır.`;
        return;
      }
    }

    // Node'ların graph'a ait olduğunu kontrol et
    const nodeA = this.nodes.find(n => n.id === nodeAId);
    const nodeB = this.nodes.find(n => n.id === nodeBId);

    if (!nodeA || !nodeB) {
      this.error = 'Seçilen node\'lardan biri veya ikisi de bu graph\'a ait değil.';
      return;
    }

    this.loading = true;
    this.error = undefined;

    this.edgesService.addEdge(nodeAId, nodeBId).subscribe({
      next: (res) => {
        console.log('✅ Edge-add success:', res);
        const edge = (res as any)?.Edge as Edge ?? (res as any)?.edge as Edge;
        console.log('✅ Added edge:', edge);
        
        // Graph state zaten edgesService tarafından güncellendi
        // localStorage'dan yeniden yükle ve UI'ı güncelle
        this.graphState.loadCurrentGraphFromStorage();
        this.loadEdges();
        
        this.loading = false;
        this.form.reset();
        this.showAddForm = false;
        
        // Add mode'da başarılı ekleme sonrası dialog'u kapat
        if (this.mode === 'add') {
          setTimeout(() => this.close(), 500);
        }
      },
      error: (err) => {
        console.error('❌ Edge-add error:', err);
        console.error('❌ Error details:', {
          status: err?.status,
          statusText: err?.statusText,
          error: err?.error,
          url: err?.url
        });
        this.loading = false;
        
        // Daha detaylı hata mesajı
        let errorMessage = 'Edge eklenemedi';
        if (err?.status === 400) {
          const errorDetail = err?.error?.detail ?? err?.error?.message ?? err?.error;
          if (typeof errorDetail === 'string') {
            // Backend'den gelen hata mesajlarını kontrol et
            if (errorDetail.toLowerCase().includes('already exists') || 
                errorDetail.toLowerCase().includes('edge already')) {
              errorMessage = 'Bu node\'lar arasında zaten bir edge bulunmaktadır.';
            } else if (errorDetail.toLowerCase().includes('not found') ||
                       errorDetail.toLowerCase().includes('belongs to')) {
              errorMessage = 'Seçilen node\'lardan biri veya ikisi de bu graph\'a ait değil.';
            } else if (errorDetail.toLowerCase().includes('mismatch')) {
              errorMessage = 'Graph ID uyuşmazlığı. Lütfen sayfayı yenileyin.';
            } else {
              errorMessage = errorDetail;
            }
          } else {
            errorMessage = 'Geçersiz istek. Lütfen node ID\'lerini kontrol edin.';
          }
        } else if (err?.status === 404) {
          errorMessage = 'Graph veya node bulunamadı.';
        } else if (err?.error?.detail) {
          errorMessage = err.error.detail;
        } else if (err?.error?.message) {
          errorMessage = err.error.message;
        } else if (typeof err?.error === 'string') {
          errorMessage = err.error;
        }
        
        this.error = errorMessage;
      }
    });
  }

  deleteEdge(edgeId: number): void {
    // Seçilen edge'i bul
    const edgeToDelete = this.edges.find(item => item.edge.id === edgeId);
    if (!edgeToDelete) {
      this.error = 'Edge bulunamadı';
      return;
    }

    if (!confirm(`Bu edge'i silmek istediğinizden emin misiniz?\n${edgeToDelete.nodeA?.tag ?? '?'} → ${edgeToDelete.nodeB?.tag ?? '?'}`)) {
      return;
    }

    this.deletingEdgeId = edgeId;
    this.error = undefined;

    console.log('🗑️ Deleting edge with ID:', edgeId);
    console.log('🗑️ Edge to delete:', edgeToDelete.edge);

    this.edgesService.deleteEdge(edgeId).subscribe({
      next: () => {
        console.log('✅ Edge-delete success for ID:', edgeId);
        this.deletingEdgeId = undefined;
        // Sadece silinen edge'i listeden kaldır, tüm listeyi yeniden yükleme
        this.edges = this.edges.filter(item => item.edge.id !== edgeId);
        // Graph state'i de güncelle
        if (this.currentGraph) {
          const updatedEdges = (this.currentGraph.edges ?? []).filter(e => e.id !== edgeId);
          const updatedGraph: Graph = { ...this.currentGraph, edges: updatedEdges };
          this.graphState.setCurrentGraph(updatedGraph);
        }
      },
      error: (err) => {
        console.error('❌ Edge-delete error:', err);
        this.deletingEdgeId = undefined;
        this.error = err?.error?.message ?? 'Edge silinemedi';
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}


