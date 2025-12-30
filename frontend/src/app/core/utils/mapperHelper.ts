import { Node } from './../../models/node.model';
import { Edge } from "../../models/edge.model";
import { GraphLink, GraphNode } from "../../models/graph.model";
import { ComponentDto } from '../../models/algorith.model';

export function mapToGraphVisualization(
  nodes: Node[],
  edges: Edge[]
): { nodes: GraphNode[]; links: GraphLink[] } {

  const nodeMap = new Map<number, GraphNode>();

  const vizNodes: GraphNode[] = nodes.map(node => {
    const vn: GraphNode = {
      id: node.id.toString(),
      domain: node,
      label: node.tag,
      color: '#69b3a2'
    };
    nodeMap.set(node.id, vn);
    return vn;
  });

  const vizLinks: GraphLink[] = edges.map(e => ({
    id: `${e.nodeAId}-${e.nodeBId}`,
    source: nodeMap.get(e.nodeAId)!.id,
    target: nodeMap.get(e.nodeBId)!.id,
    weight: e.weight,
    domain: e
  }));

  return { nodes: vizNodes, links: vizLinks };
}


export function buildComponentColorMap(components: ComponentDto[]): Record<string, number> {
  const map: Record<string, number> = {};

  for (const component of components) {
    for (const node of component.nodes) {
      map[node.id] = component.id;
    }
  }

  return map;
}


