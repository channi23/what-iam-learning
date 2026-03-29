import java.util.*;
public class Lazy_Seg{
    static int[]arr = new int[100005];
    static int[]seg = new int[4*100005];
    static int[]lazy = new int[4*100005];
    public static void build(int idx, int left,int right){
        if(left==right){
            seg[idx] = arr[left];
            return;
        }
        int mid = left+(right-left)/2;
        build(2*idx+1,left,mid);
        build(2*idx+2, mid+1, right);
        seg[idx] = seg[idx*2+1]+seg[idx*2+2];
    }
    public static void rangeUpdate(int idx, int left, int right, int l, int r){
        int val= seg
        if(lazy[idx]!=0){
            seg[idx] = 
        }
    }
    public static void lazyQuery(int idx,int left,int right, int l,int r){

    }
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        for(int i=0;i<n;i++){
            arr[i] = sc.nextInt();
        }
        //first let us build the seg tree
        build(0,0,n-1);
        int totalSum =0;
        int q = sc.nextInt();
        for(int i=0;i<q;i++){
            int t = sc.nextInt();
            int l = sc.nextInt();
            int r = sc.nextInt();
            if(t==1){
                update(0,0,n-1,l,r);
            }
            else if(t==2){
                totalSum += lazyQuery(0,0,n-1,l,r);
            }

        }
        System.out.println(totalSum);
        
    }
}
