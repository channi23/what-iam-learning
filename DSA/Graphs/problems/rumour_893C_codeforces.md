# Rumour_893C_codeforces Question

so basically some person x wants to spread rumours to his friends , so firstly he needs to tell the lie or some misinfo to one of his friend for which he needs to bribe him
so, that is given in the input, now the straight question is how much of bribe that the x person needs to give so that he can spend only some amount only some money and spread good rumours, for the total network

so basically this one of the variant of the connected components question that i have already done previously

code in java

```java
import java.util.*;

public class Main {
    static List<List<Integer>> graph;
    static boolean[] visited;
    static int[] bribes;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt(); // number of nodes
        int m = sc.nextInt(); // number of edges

        bribes = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            bribes[i] = sc.nextInt();
        }

        graph = new ArrayList<>();
        for (int i = 0; i <= n; i++) {
            graph.add(new ArrayList<>());
        }

        for (int i = 0; i < m; i++) {
            int u = sc.nextInt();
            int v = sc.nextInt();
            graph.get(u).add(v);
            graph.get(v).add(u);
        }

        visited = new boolean[n + 1];
        long totalCost = 0;

        for (int i = 1; i <= n; i++) {
            if (!visited[i]) {
                totalCost += bfsMinCost(i);
            }
        }

        System.out.println(totalCost);
    }

    static int bfsMinCost(int start) {
        Queue<Integer> q = new LinkedList<>();
        q.offer(start);
        visited[start] = true;

        int minCost = bribes[start];

        while (!q.isEmpty()) {
            int node = q.poll();
            minCost = Math.min(minCost, bribes[node]);

            for (int nei : graph.get(node)) {
                if (!visited[nei]) {
                    visited[nei] = true;
                    q.offer(nei);
                }
            }
        }
        return minCost;
    }
}

```
