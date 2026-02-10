# The topological sort, also called kahn's algorithm 

## What is Topological sort
- Topological sort is an ordering of vertices in a DAG such that every directed edge u->v where node U appears before node V

Reference for me as steps:
- We need to have basically in a standard kahns algorithm an indegree array, once we find the indegree 
- we need to push those nodes which have 0 indegree's.
- now this processes is repeated, we always decrease the indegree count from the array once we get elements into the queue that are contributing to the nodes indegree

## Standard implementation of Topological Sort:

```java
/// first let us assume that we have a graph, where the DAG,now as we get the graph, we need to find  the indegree for each and every node count

public  class Main{
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int m = sc.nextInt();
        List<Integer>topoList = new ArrayList<>();
        List<List<Integer>>graph = new ArrayList<>();
        for(int i=0;i<=n;i++){
            graph.add(new ArrayList());
        }
        int[]indegree = new int[n+1];
        for(int i=0;i<m;i++){
            int u = sc.nextInt();
            int v = sc.nextInt();
            graph.get(u).add(v);
            indegree[v]++;
        }
        
        //now that we have the indegree array, now we must push the nodes with zero indegree into the queue
        Queue<Integer>q = new LinkedList<>();
        for(int i=1;i<=n;i++){
            if(indegree[i]==0){
                q.offer(i);
            }
        }
    //okay now that we have  the nodes with the zero index in the q,  now lets find the neighbors of the nodes that are already present in the queue
    while(!q.isEmpty()){
        int node = q.poll();
        topoList.add(node);
        for(int ng:graph.get(node)){
            indegree[ng]--;
            if(indegree[ng]==0){
                q.offer(ng);
            }
        }
    }
    System.out.println("The TopoSort of the Graph is :");
    for(int node:topoList){
        System.out.print(node+" ");

    }

        

    }
}

```




