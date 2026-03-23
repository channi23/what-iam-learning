import java.util.*;

public class MinJumps {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int x = sc.nextInt();
        int y = sc.nextInt();

        int[] arr = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            arr[i] = sc.nextInt();
        }

        // graph creation
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i <= n; i++) {
            graph.add(new ArrayList<>());
        }

        for (int i = 1; i <= n; i++) {
            int left = ((i - arr[i] - 1 + n) % n) + 1;
            int right = ((i + arr[i] - 1) % n) + 1;
            graph.get(i).add(left);
            graph.get(i).add(right);
        }

        // BFS
        boolean[] visited = new boolean[n + 1];
        Queue<int[]> q = new LinkedList<>();

        q.add(new int[]{x, 0});
        visited[x] = true;

        while (!q.isEmpty()) {
            int[] curr = q.poll();
            int node = curr[0];
            int count = curr[1];

            if (node == y) {
                System.out.println(count);
                return;
            }

            for (int ng : graph.get(node)) {
                if (!visited[ng]) {
                    visited[ng] = true;
                    q.add(new int[]{ng, count + 1});
                }
            }
        }

        System.out.println(-1);
    }
}
