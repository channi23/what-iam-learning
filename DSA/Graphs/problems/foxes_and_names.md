# Fox and Names 

You can find this question desciption in the codeforces platform Question Number 

```java

public class Main{
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        String[]words = new String[n];
        for(int i=0;i<n;i++){
            words[i] = sc.next();
        }
        List<List<Integer>>graph = new ArrayList<>();
        for(int i=0;i<26;i++){
            graph.add(new ArrayList<>());
        }
        int[]indegree = new int[26];
        
        for(int i=0;i<n-1;i++){
            String s1 = words[i];
            String s2 = words[i+1];
            
            int minLen = Math.min(s1.length(),s2.length());
            boolean found = false;
            for(int j=0;j<minLen;j++){
                if(s1.charAt(j)!=s2.charAt(j)){
                    int u  = s1.charAt(j)-'a';
                    int v  = s2.charAt(j)-'a';
                    graph.get(u).add(v);
                    indegree[v]++;
                    found = true;
                    break;
                }
            }
            if(!found && s1.length()>s2.length()){
                System.out.println("Impossible");
                return;
            }
            
        }
        Queue<Integer>q = new LinkedList<>();
        for(int i=0 ;i<26;i++){
            if(indegree[i]==0){
                q.add(i);
            }
        }
        StringBuilder sb = new StringBuilder();
        while(!q.isEmpty()){
            int node = q.poll();
            sb.append((char)(node+'a'));
            for(int ng:graph.get(node)){
                indegree[ng]--;
                if(indegree[ng]==0){
                    q.add(ng);
                }
            }       
        }
        if(sb.length()!=26){
            System.out.println("Impossible");
        }
        else{
            System.out.println(sb.toString());
        }
        
    }
}
```
