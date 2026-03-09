import java.util.*;
public class Elephant{
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[]sarr = new int[n];
        int[]arr = new int[n];
        for(int i=0;i<n;i++){
            arr[i] = sc.nextInt();
            sarr[i] = arr[i];
        }
        if(arr.length==2){
            System.out.println("YES");
            return;
        }
        Arrays.sort(sarr);
        int count=0;
        boolean flag = true;
        for(int i=0;i<n;i++){
            int diff = Math.abs(arr[i]-sarr[i]);
            if(diff>0){
                count++;
            }
            if(count>2){
                flag = false;
                break;
            }
        }
        if(flag){
            System.out.println("YES");
        }
        else{
            System.out.println("NO");
        }

    }
}
