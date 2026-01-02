using System.Linq;
using sna_domain.Exceptions;

namespace sna_domain.Services;

public record TraversalResult(
    IReadOnlyList<Node> Nodes,
    IReadOnlyList<Edge> Edges
);

public class GraphAlgorithms
{
    public static IReadOnlyList<Node> BFS(Graph graph, Node start, HashSet<Node> visited)
    {
        visited ??= [];
        var queue = new Queue<Node>();
        var result = new List<Node>();

        queue.Enqueue(start);
        visited.Add(start);

        while (queue.Count > 0)
        {
            var current = queue.Dequeue();
            result.Add(current);
            var neighbors = current.GetNeighbors(graph).ToList();
            foreach (var neighbor in neighbors )
            {
                if (visited.Add(neighbor))
                    queue.Enqueue(neighbor);
                
            }
        }

        return result;
    }
    //Making DFS symetric to BFS 
    public static IReadOnlyList<Node> DFS(Graph graph, Node start,HashSet<Node> visited)
    {
        if (!graph.ContainsNode(start))
            throw new NotFoundException($"Node {start.Tag}", start.Id.ToString(), graph.Title);
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

    public static IReadOnlyList<(Node Node, int Degree)> KDegreeCentrality(Graph graph, int? k)
    {
        if (k < 0)
            throw new DomainException("k must be positive.");
        if(!graph.ComputeDegreeCentrality())
            throw new EmptyGraphException(graph.Id.ToString());

        if(k is null)
            return [..graph.Nodes
                .Select(node => ( Node : node, node.DegreeCentrality))
                .OrderByDescending(node => node.DegreeCentrality)];

        return [..graph.Nodes
                .Select(node => ( Node : node, node.DegreeCentrality))
                .OrderByDescending(node => node.DegreeCentrality)
                .Take(k.Value)];
           
    }

    public static IReadOnlyList<IReadOnlyCollection<Node>> GetConnectedComponents(Graph graph)
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

    // Welsh-Powell graph coloring: assigns a color index to each node.
    // Color indices are integers; UI tarafında gerçek renge palette ile dönüştürülebilir.
    public static IReadOnlyDictionary<Node, int> WelshPowell(Graph graph)
    {
        if (!graph.Nodes.Any())
            return new Dictionary<Node, int>();

        // Dereceye göre azalan, aynı derece için Id ile deterministik sıra.
        var ordered = graph.Nodes
            .OrderByDescending(n => n.Connections)
            .ThenBy(n => n.Id)
            .ToList();

        var colorOf = new Dictionary<Node, int>();

        foreach (var node in ordered)
        {
            var neighborColors = node.GetNeighbors(graph)
                                      .Where(colorOf.ContainsKey)
                                      .Select(n => colorOf[n])
                                      .ToHashSet();

          /* Graph Color service 27.satır */  
            var color = 0;
            while (neighborColors.Contains(color))
                color++;

            colorOf[node] = color;
        }

        return colorOf;
    }

    public static IReadOnlyList<Node> Dijkstra(Graph graph, Node start, Node target)
    {
        if (!graph.Nodes.Contains(start))
            throw new NotFoundException(start.Tag, start.Id.ToString(), graph.Title);
        if (!graph.Nodes.Contains(target))
            throw new NotFoundException(target.Tag, target.Id.ToString(), graph.Title);

        var distances = graph.Nodes.ToDictionary(node => node, _ => double.PositiveInfinity);
        var previous = new Dictionary<Node, Node>();
        var queue = new PriorityQueue<Node, double>();

        distances[start] = 0;
        queue.Enqueue(start, 0);

        while (queue.Count > 0)
        {
            var current = queue.Dequeue();
            if (current.Equals(target))
                return ReconstructPath(previous, target);

            foreach (var neighbor in current.GetNeighbors(graph))
            {
                var weight = GetEdgeWeight(graph, current, neighbor);
                var tentative = distances[current] + weight;

                if (tentative < distances[neighbor])
                {
                    distances[neighbor] = tentative;
                    previous[neighbor] = current;
                    queue.Enqueue(neighbor, tentative);
                }
            }
        }

        throw new DomainException("No path found between the provided nodes.");
    }

    public static IReadOnlyList<Node> AStar(Graph graph, Node start, Node target)
    {
        if (!graph.Nodes.Contains(start))
            throw new NotFoundException(start.Tag, start.Id.ToString(), graph.Title);
        if (!graph.Nodes.Contains(target))
            throw new NotFoundException(target.Tag, target.Id.ToString(), graph.Title);

        var gScore = graph.Nodes.ToDictionary(node => node, _ => double.PositiveInfinity);
        var fScore = graph.Nodes.ToDictionary(node => node, _ => double.PositiveInfinity);
        var previous = new Dictionary<Node, Node>();
        var openSet = new PriorityQueue<Node, double>();

        gScore[start] = 0;
        fScore[start] = Heuristic(start, target);
        openSet.Enqueue(start, fScore[start]);

        while (openSet.Count > 0)
        {
            var current = openSet.Dequeue();
            if (current.Equals(target))
                return ReconstructPath(previous, target);

            foreach (var neighbor in current.GetNeighbors(graph))
            {
                var weight = GetEdgeWeight(graph, current, neighbor);
                var tentativeG = gScore[current] + weight;

                if (tentativeG < gScore[neighbor])
                {
                    previous[neighbor] = current;
                    gScore[neighbor] = tentativeG;
                    fScore[neighbor] = tentativeG + Heuristic(neighbor, target);
                    openSet.Enqueue(neighbor, fScore[neighbor]);
                }
            }
        }

        throw new DomainException("No path found between the provided nodes.");
    }

    private static double GetEdgeWeight(Graph graph, Node from, Node to)
    {
        var edge = graph.Edges.FirstOrDefault(e => e.Connects(from, to)) ??
         throw new DomainException("Edge not found between the provided nodes.");
        return edge.Weight;
    }

    private static IReadOnlyList<Node> ReconstructPath(Dictionary<Node, Node> previous, Node current)
    {
        var path = new List<Node>
        {
            current
        };

        while (previous.TryGetValue(current, out var prev))
        {
            current = prev;
            path.Add(current);
        }

        path.Reverse();
        return path;
    }

    private static double Heuristic(Node from, Node to)
    {
        // Admissible heuristic is zero; safe when no positional data exists.
        return 0;
    }

    

    public static IReadOnlyDictionary<Node, int> DetecteCommunity(Graph graph)
    {
        // 1. Initialize: Every node gets a unique label (usually its own ID)
        var labels = graph.Nodes.ToDictionary(n => n, n => n.Id);
        var nodesList = graph.Nodes.ToList();
        var rnd = new Random();
        bool changed = true;

        while (changed)
        {
            changed = false;
            
            // CRITICAL FIX 1: Shuffle processing order every iteration
            // (Using a standard Fisher-Yates shuffle extension or similar)
            nodesList.Shuffle(rnd); 

            foreach (var node in nodesList)
            {
                // Get neighbor labels
                var neighborLabels = node.GetNeighbors(graph)
                                        .Select(n => labels[n])
                                        .ToList();

                if (neighborLabels.Count == 0) continue;

                // Group by label frequency
                var groups = neighborLabels.GroupBy(l => l)
                                        .Select(g => new { Label = g.Key, Count = g.Count() })
                                        .ToList();

                int maxCount = groups.Max(g => g.Count);
                
                // Get all labels that have the max frequency (Candidates)
                var candidates = groups.Where(g => g.Count == maxCount)
                                    .Select(g => g.Label)
                                    .ToList();

                // CRITICAL FIX 2: Break ties randomly
                int newLabel = candidates[rnd.Next(candidates.Count)];

                if (labels[node] != newLabel)
                {
                    labels[node] = newLabel;
                    changed = true;
                }
            }
        }

        return labels;
    }

 
}

public static class ListExtensions
{
    public static void Shuffle<T>(this IList<T> list, Random rnd)
    {
        int n = list.Count;
        while (n > 1)
        {
            n--;
            int k = rnd.Next(n + 1);
            T value = list[k];
            list[k] = list[n];
            list[n] = value;
        }
    }
}