# Number  of Connected Components

## Question - You are given an undirected graph, we need to find the number of connected components

okay before solving the question, we need to first learn how do we represent graph in code, both adjacency list and matrix..

### Adjacency List

okay first let us consider n-number of nodes and  m-number of edges

```java

//first we need a nested list 

List<List<Integer>> graph = new ArrayList<>();

//here we create a list for each node, as nodes numbering start from 1, we take till n and not n-1
for(int i=0;i<=n;i++){
    graph.add(new ArrayList());
}

for(int i=0;i<m;i++){
    int v1 = sc.nextInt(); //here in the input consists of vertices which  have edges, and they are undirected
    int v2 = sc.nextInt();
    graph.get(v1).add(v2);
    graph.get(v2).add(v2); //creating edges
    
}

```
okay now coming to our code we need to find the number of connected components, so we need to first check the connected vertices of  the current vertex by taking a boolean visited array
after traversing it and marking connected in the array, if we find a vertex which is still not visited and it was not a nieghbor, then we consider it as a new component in the graph.

so we traverse by one of the graph traversing technique which is BFS 

code for bfs

```java
//let us assume that the graph is already there, so lets us the write the bfs function diretly here

public void bfs(List<List<Integer>>graph, boolean[]visited,int vertex){
    visited[vertex] = true; //as we alredy visited this

    Queue<Integer>q = new LinkedList<>();
    q.add(vertex);
    while(!q.isEmpty()){
        int node = q.poll();
        for(int i:graph.get(node)){
        if(!visited[i]){
            visited[i] = true;
            q.add(i);
            }
        }
    }
}


```

okay, now that we have the bfs function , lets write the main function

```java

public static void main(String[]args){
    Scanner sc = new Scanner(System.in);
    int t=sc.nextInt();//number of test case;
    while(t-->0){
        int n = sc.nextInt(); //number of nodes
        int m = sc.nextInt(); //number of edges
        int count=0; //for tracking the number of connected components
        
        //create the adjaceny list in here, as written above
        
        //we need to visited array(boolean)

        boolean[]visited = new boolean[n];
        
        for(int i=1;i<=n;i++){
            if(visited[i]==false){
                bfs(graph,visited,i);
                count++;
            }
        }
    }
    System.out.println(count);
}

```
as we did with the bfs, now we need to do that with bfs and adjaceny matrix as a new combination

```java
//dfs function

public void dfs(List<List<Integer>>graph,boolean[]visited,int node){
    visited[node] = true;
    for(int i:graph.get(node)){
        if(visited[i]==false){
            dfs(graph,visited,i); //using recursion we do the depth first search
        }
    }
}

```
now we need to represent the graph in the adjacency matrix form

```java

int [][]graph = new graph[n+1][n+1];
for(int i=0;i<=n;i++){
int u =sc.nextInt();
int v = sc.nextInt();
graph[u][v] = 1;
graph[v][u] = 1;
}

```

bfs with adjcency matrix

```java

public void bsf(int[][]graph,int node,boolean[] visited){
    Queue<Integer> q = new LinkedList<>();
    q.add(node);
    visited[node] = true;
    while(!q.isEmpty()){
        int n = q.poll();
        int i=0;
        for(int val:graph[n]){
            if(val==1&&!visited[i]){
                visited[i]==true;
                q.add(i);
            }
            i++;//column index
        }
    }
}
```

dfs with adjcency matrix

```java
public void dfs(int[][]graph,int node,boolean[]visited){
    visited[node] = true;
        for(int i=0;i<graph.length;i++){
            if(graph[node][i]==1&&!visited[i]){
                dfs(graph,i,visited);
        }
    }
}
```





