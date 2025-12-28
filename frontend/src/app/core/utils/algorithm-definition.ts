// algorithm-registry.ts
export enum AlgorithmCategory {
  Traversal = 'traversal',
  Pathfinding = 'pathfinding',
  Centrality = 'centrality',
  Clustering = 'clustering'
}

export interface AlgorithmDefinition {
  key: string;
  label: string;
  category: AlgorithmCategory;
  requiresStartNode: boolean;
  requiresEndNode: boolean;
  animated: boolean;
}


export const ALGORITHMS: AlgorithmDefinition[] = [
  {
    key: 'bfs',
    label: 'Breadth-First Search',
    category: AlgorithmCategory.Traversal,
    requiresStartNode: true,
    requiresEndNode: false,
    animated: true
  },
  {
    key: 'dfs',
    label: 'Depth-First Search',
    category: AlgorithmCategory.Traversal,
    requiresStartNode: true,
    requiresEndNode: false,
    animated: true
  },
  {
    key: 'dijkstra',
    label: 'Dijkstra',
    category: AlgorithmCategory.Pathfinding,
    requiresStartNode: true,
    requiresEndNode: true,
    animated: true
  },
  {
    key: 'astar',
    label: 'A* Search',
    category: AlgorithmCategory.Pathfinding,
    requiresStartNode: true,
    requiresEndNode: true,
    animated: true
  },
  {
    key: 'degree-centrality',
    label: 'Degree Centrality',
    category: AlgorithmCategory.Centrality,
    requiresStartNode: false,
    requiresEndNode: false,
    animated: false
  },
  {
    key: 'connected-components',
    label: 'Connected Components',
    category: AlgorithmCategory.Clustering,
    requiresStartNode: false,
    requiresEndNode: false,
    animated: false
  },
  {
    key: 'community-detection',
    label: 'Community Detection',
    category: AlgorithmCategory.Clustering,
    requiresStartNode: false,
    requiresEndNode: false,
    animated: false
  },
  {
    key: 'coloring',
    label: 'coloring',
    category: AlgorithmCategory.Traversal,
    requiresStartNode: false,
    requiresEndNode: false,
    animated: false
  }
];

export interface AlgorithmResultSummary {
  executionTimeMs: number;
  nodeCount?: number;
  edgeCount?: number;
  pathLength?: number;
}
