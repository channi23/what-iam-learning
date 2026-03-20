import java.util.*;
public class SW{
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        int n =sc.nextInt();
        int k = sc.nextInt();
        int[]arr = new int[n];
        for(int i=0;i<n;i++){
            arr[i] = sc.nextInt();
        }
        int left=0;
        int right=0;
        Map<Integer,Integer>map = new HashMap<>();
        int currSum=0;
        int maxSum=0;

        while(right<n){
             currSum += arr[right];
            map.put(arr[right],map.getOrDefault(arr[right],0)+1);

            while(map.size()>k){
                currSum -= arr[left];
                map.put(arr[left],map.get(arr[left])-1);
                if(map.get(arr[left])==0) map.remove(arr[left]);
                left++;
            }
            right++;
            maxSum = Math.max(maxSum,currSum);
        }
        System.out.println(maxSum);
    }
}
