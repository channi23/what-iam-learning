// Implementation of dksalgo
import java.util.*;
public class Main{
    public static class Edge{
        int v,w;
        public Edge(int v,int w){
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
        //now we are done with the graph rep
        int []dist = new int[n+1];
        Arrays.fill(dist,Integer.MAX_VALUE); //intializing all the distances with infinity
        PriorityQueue<Edge>pq = new PriorityQueue<>((a,b)->a.w-b.w);
        
        //now we start traversing like bfs while exploring the neighbors of the node, and we upadate the weight if we find a lesser one/best one for the dist arr
        int src=1;
        dist[src] = 0;
        pq.add(new Edge(src,0));

        while(!pq.isEmpty()){
            Edge curr = pq.poll();
            int node = curr.v;
            int d = curr.w;

            if(d>dist[node]) continue;
            
            for(Edge ng:graph.get(node)){
                int tempNode = ng.v;
                int tempDist = ng.w;

                if(dist[node]+tempDist<dist[tempNode]){
                    dist[tempNode] = dist[node]+tempDist;
                    pq.add(new Edge(tempNode,dist[tempNode]));
                }
            }
        }
        System.out.println("The Final Dist Array will be: "+Arrays.toString(dist));

    }
}
