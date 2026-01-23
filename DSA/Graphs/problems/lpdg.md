# Longest Possible Distance in  a graph
give an undirected,acyclic-connected graph , find the length of the longest path in graph

## Intuition:

as the graph is acyclic and we need to find the longest, by default an acyclic can be considered as a tree, now here we only need to find the diameter of the tree


To find the diameter of a tree:
- we need to first find the farthest node, from any node
- then from the farthest node we need to go to the node which is the last or the farthest in  the graph while tracking the maxDistance

so basically i am going to do bfs( note that you can do dfs too, but i personally hate it.. ) 
also note that i am using the same function down in the code to get different results...

### Here is the code Enjoy:

```java

import java.io.*;
import java.util.*;

public class Main {

    public static void main(String[] args) throws IOException {
        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Main. */
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        int t =Integer.parseInt(br.readLine().trim());
        while(t-->0){
            StringTokenizer st = new StringTokenizer(br.readLine());
            int n = Integer.parseInt(st.nextToken());
            int m = Integer.parseInt(st.nextToken());
            //create the adjacency list
            List<List<Integer>>graph = new ArrayList<>();
            for(int i=0;i<=n;i++){
                graph.add(new ArrayList<>());
            }
            for(int i=0;i<m;i++){
                st = new StringTokenizer(br.readLine());
                int u = Integer.parseInt(st.nextToken());
                int v = Integer.parseInt(st.nextToken());
                graph.get(u).add(v);
                graph.get(v).add(u);
            }
            int node = solve(graph,1,true);
            int answer = solve(graph,node,false);

            bw.write(answer+ "\n");

        }
        bw.flush();
    }
        public static int solve(List<List<Integer>>graph,int source, boolean flag){
            int n = graph.size();
            int[]dist = new int[n]; //here we need the dist arr to find the maxDistance we got so far
            Arrays.fill(dist,-1);
            Queue<Integer>q = new LinkedList<>();
            q.add(source);
            dist[source] = 0;

            int fNode = source;
            int maxDist=0;

            while(!q.isEmpty()){
                int u = q.poll();
                for(int v:graph.get(u)){
                    if(dist[v]==-1){
                        dist[v] = dist[u]+1;
                        q.add(v);

                        if(dist[v]>maxDist){
                            fNode = v;
                            maxDist = dist[v];
                        }
                    }
                    
                }
            }
            return flag? fNode:maxDist;

        }
}

```
