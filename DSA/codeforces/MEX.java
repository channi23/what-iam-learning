import java.util.*;
public class Main{
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        while(t-->0){
            int n = sc.nextInt();
            int[]arr = new int[n+1];
            for(int i=1;i<=n;i++){
                arr[i] = sc.nextInt();
            }
            //we need f(1,i) and f(i+1,n)
            for(int i=1;i<=n;i++){
                
            }
            // [1 0 5 0 6 1] -> (0,2) ->[1 1 6 0 5 0]->(2,1)->(0,1)->(2,1)->(2,1)
        }
    }
}
