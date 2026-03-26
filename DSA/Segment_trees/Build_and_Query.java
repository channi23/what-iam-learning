import java.util.*;
// this is a question where we will be getting an array with the size of n and also some q queries, this can be solved using segment trees optimally, so yeah leanring this code
public class Build_and_Query{
    static int[]seg = new int[100005];
    static int[]arr = new int[100005];
    public static  void build(int idx,int left,int right){
        //in this method we are going to build the segment tree
        if(left==right){
            seg[idx] = arr[left];
            return;
        }

        int mid = (left+right)/2;
        build(2*idx+1,left,mid);
        build(2*idx+2,mid+1,right);
        seg[idx] = Math.max(seg[2*idx+1],seg[2*idx+2]);

    }
    public static  int query(int idx,int left,int right, int l, int r){
        //after we have build the segement tree we can query here
        if(left>=l && right<=r){
            return  seg[idx];
        }
        if(right < l || left>r){
            return Integer.MIN_VALUE;
        }
        int mid = (left+right)/2;
        int lchild = query(2*idx+1,left,mid,l,r);
        int rchild = query(2*idx+2,mid+1,right,l,r);
        return Math.max(lchild,rchild);
    }
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int q = sc.nextInt();

        for(int i=0;i<n;i++){
            arr[i] = sc.nextInt();
        }
        build(0,0,n-1);
        //okay we have the array, now lets use take the queries
        for(int i=0;i<q;i++){
            int l = sc.nextInt();
            int r = sc.nextInt();
            int max = query(0,0,n-1,l,r);
            System.out.println(max);
        }
    }
}
