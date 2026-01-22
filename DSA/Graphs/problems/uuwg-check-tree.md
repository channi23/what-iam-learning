# Undirected Unweighted graph - check if it is tree or not

condition - it should be acyclic and connected
so basically to detect if a graph is a tree or not i , i need to see of the connected components of the graph is 1 and also if the edges are n-1 if there are n nodes that we have in the graph, so a simple and basic question..

## Code Implementation


```java
import java.io.*;
import java.util.*;

public class Main {

    public static void main(String[] args) {
        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Main. */
        Scanner sc = new Scanner(System.in);
        int t =sc.nextInt();
        while(t-->0){
            int n = sc.nextInt();
            int m = sc.nextInt();
            int edgeCount=0;
            int count=0;
            boolean[]visited = new boolean[n+1];
            //adjacency list rep
            List<List<Integer>>graph = new ArrayList<>();

            for(int i=0;i<=n;i++){
                graph.add(new ArrayList());
            }
            for(int i=0;i<m;i++){
                int u = sc.nextInt();
                int v = sc.nextInt();
                edgeCount++;
                graph.get(u).add(v);
                graph.get(v).add(u);
            }

            for(int i=1;i<=n;i++){
                if(visited[i]==false){
                    bfs(graph,i,visited);
                    count++;
                }
            }
          
            if(edgeCount==n-1 && count==1){
                System.out.println("False");
            }
            else{
                System.out.println("True");
            }

        }
    }
    public static  void bfs(List<List<Integer>>graph, int n,boolean[]visited){
        Queue<Integer>q = new LinkedList<>();
        q.add(n);
        visited[n] = true;

        while(!q.isEmpty()){
            int temp = q.poll();
            for(int node:graph.get(temp)){
                if(!visited[node]){
                    visited[node] = true;
                    q.add(node);
                }
            }
        }
    }
    
}
```


