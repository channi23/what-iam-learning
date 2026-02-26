import java.util.*;
public class Dks{
    public static class Edge{
        int v;
        long w;
        public Edge(int v,long w){
            this.v = v;
            this.w = w;
        }
    }
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int m = sc.nextInt();
        List<List<Edge>>graph = new ArrayList<>();
        for(int i=0;i<=n;i++){
            graph.add(new ArrayList<>());
        }
        for(int i=0;i<m;i++){
            int u = sc.nextInt();
            int v = sc.nextInt();
            int w = sc.nextInt();
            graph.get(u).add(new Edge(v,w));
            graph.get(v).add(new Edge(u,w));
        }
        int[]parent = new int[n+1];
        long[]dist = new long[n+1];
        Arrays.fill(parent,-1);
        Arrays.fill(dist,Long.MAX_VALUE);
        
        PriorityQueue<Edge>pq = new PriorityQueue<>((a,b)->Long.compare(a.w,b.w));
    
        int src=1;
        dist[src]=0;
        pq.add(new Edge(src,0));

        while(!pq.isEmpty()){
            Edge curr = pq.poll();
            int node = curr.v;
            long weight = curr.w;

            if(weight>dist[node]){
                continue;
            }
            for(Edge ng:graph.get(node)){
                int tempNode = ng.v;
                long tempDist = ng.w;
                if(dist[node]+tempDist<dist[tempNode]){
                    dist[tempNode] = dist[node]+tempDist;
                    parent[tempNode] = node;
                    pq.add(new Edge(tempNode,dist[tempNode]));
                }
            }

        }
        if(dist[n]==Long.MAX_VALUE){
            System.out.println("-1");
            return;
        }
        List<Integer>path = new ArrayList<>();
        int curr=n;
        while(curr!=-1){
            path.add(curr);
            curr = parent[curr];
        }
        Collections.reverse(path);
        for(int node:path){
            System.out.print(node+" ");
        }
        
    }
}
