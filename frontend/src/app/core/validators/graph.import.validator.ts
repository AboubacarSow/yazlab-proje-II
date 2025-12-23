import { ImportGraph } from "../../models/graph.model";

export function validateImportGraph(graph: ImportGraph): string[] {
  const errors: string[] = [];
  const nodeTags = new Set<string>();

  if (!graph.title || graph.title.trim().length === 0) {
    errors.push('Graph tag is required');
  }

  for (const node of graph.nodes ?? []) {
    if (node.activity < 0 || node.activity > 1) {
      errors.push(`Node ${node.tag}: activity must be between 0 and 1`);
    }

    if (node.interaction < 0) {
      errors.push(`Node ${node.tag}: interaction must be >= 0`);
    }

    if (nodeTags.has(node.tag)) {
      errors.push(`Duplicate node tag: ${node.tag}`);
    }

    nodeTags.add(node.tag);
  }

  for (const edge of graph.edges ?? []) {
    if (!nodeTags.has(edge.nodeTagA) || !nodeTags.has(edge.nodeTagB)) {
      errors.push(
        `Invalid edge: ${edge.nodeTagA} -> ${edge.nodeTagB}`
      );
    }
  }

  return errors;
}
