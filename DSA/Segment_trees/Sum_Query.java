import java.util.*;
public class Sum_Query{
    static int[]arr = new int[100005];
    static int[]seg = new int[100005];
    public static void build(int idx,int left,int right){
        if(left==right){
            seg[idx] = arr[left];
            return;
        }
        int mid = left+(right-left)/2;
        build(2*idx+1,left,mid);
        build(2*idx+2,mid+1,right);
        seg[idx] = seg[2*idx+1]+seg[2*idx+2];
    }
    public static int query(int idx, int left, int right,int l, int r){
        if(left>=l && right<=r){
            return seg[idx];
        }
        if(left>r || right<l){
            return 0;
        }
        int mid = left+(right-left)/2;
        int leftSum = query(2*idx+1,left,mid,l,r);
        int rightSum = query(2*idx+2,mid+1,right,l,r);
        return  leftSum+rightSum;
    }
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        for(int i=0;i<n;i++){
            arr[i] = sc.nextInt();
        }
        build(0,0,n-1);
        int q = sc.nextInt();
        int totalSum=0;
        for(int i=0;i<q;i++){
            int l = sc.nextInt();
            int r = sc.nextInt();
            totalSum += query(0,0,n-1,l,r);
        }
        System.out.println(totalSum);

    }
}
