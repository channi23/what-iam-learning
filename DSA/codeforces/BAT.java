import java.util.*;

public class BAT {

    static class Edge {
        int v;
        long w;
        Edge(int v, long w) {
            this.v = v;
            this.w = w;
        }
    }

    static class Node {
        int u;
        long dist;
        Node(int u, long dist) {
            this.u = u;
            this.dist = dist;
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int m = sc.nextInt();

        List<List<Edge>> cities = new ArrayList<>();
        for (int i = 0; i <= n; i++) {
            cities.add(new ArrayList<>());
        }

        for (int i = 0; i < m; i++) {
            int u = sc.nextInt();
            int v = sc.nextInt();
            long w = sc.nextLong();

            w = w * 2; 

            cities.get(u).add(new Edge(v, w));
            cities.get(v).add(new Edge(u, w));
        }

        long[] dist = new long[n + 1];

        for (int i = 1; i <= n; i++) {
            dist[i] = sc.nextLong();
        }

        PriorityQueue<Node> pq =
                new PriorityQueue<>((a, b) -> Long.compare(a.dist, b.dist));

        
        for (int i = 1; i <= n; i++) {
            pq.add(new Node(i, dist[i]));
        }

        while (!pq.isEmpty()) {
            Node curr = pq.poll();

            if (curr.dist > dist[curr.u]) continue;

            for (Edge e : cities.get(curr.u)) {
                if (dist[e.v] > curr.dist + e.w) {
                    dist[e.v] = curr.dist + e.w;
                    pq.add(new Node(e.v, dist[e.v]));
                }
            }
        }

        
        for (int i = 1; i <= n; i++) {
            System.out.print(dist[i] + " ");
        }
    }
}
