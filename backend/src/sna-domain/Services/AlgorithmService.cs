using sna_domain.Entities;
using sna_domain.Exceptions;

namespace sna_domain.Services;

public class GraphAlgorithmService
{
    public  IReadOnlyList<Node> BFS(Graph graph, Node start, HashSet<Node> visited)
    {
        if (!graph.Nodes.Contains(start))
            throw new NotFoundException(start.Tag, start.Id.ToString(), graph.Name);

        visited ??= [];
        var queue = new Queue<Node>();
        var result = new List<Node>();

        queue.Enqueue(start);
        visited.Add(start);

        while (queue.Count > 0)
        {
            var current = queue.Dequeue();
            result.Add(current);

            foreach (var neighbor in current.GetNeighbors(graph))
            {
                if (visited.Add(neighbor))
                {
                    queue.Enqueue(neighbor);
                }
            }
        }

        return result;
    }
    //Making DFS symetric to BFS 
    public IReadOnlyList<Node> DFS(Graph graph, Node start,HashSet<Node> visited)
    {
        if (!graph.Nodes.Contains(start))
            throw new NotFoundException(start.Tag, start.Id.ToString(), graph.Name);
        visited ??= [];
        var result = new List<Node>();
        Visit(graph,start, visited, result);
        return result;
    }

    private static void Visit(Graph graph, Node node, HashSet<Node> visited, List<Node> result)
    {
        visited.Add(node);
        result.Add(node);

        foreach (var neighbor in node.GetNeighbors(graph))
        {
            if (!visited.Contains(neighbor))
                Visit(graph,neighbor, visited, result);
        }
    }

    public IReadOnlyList<Node> TopDegreeCentrality(Graph graph, int k)
    {
        if (k <= 0)
            throw new DomainException("k must be positive.");
        if(!graph.ComputeDegreeCentrality())
            throw new EmptyGraphException(graph.Id.ToString());

        return [.. graph.Nodes
            .OrderByDescending(n => n.DegreeCentrality)
            .Take(k)];
    }

    public IReadOnlyList<IReadOnlyCollection<Node>> GetConnectedComponents(Graph graph)
    {
        var visited = new HashSet<Node>();
        var components = new List<IReadOnlyCollection<Node>>();

        foreach (var node in graph.Nodes)
        {
            if (visited.Contains(node)) continue;
            // components is a matrix here
            components.Add(BFS(graph,node, visited));
        }

        return components;
    }

}