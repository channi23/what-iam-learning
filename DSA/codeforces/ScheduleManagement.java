import java.util.*;
public class ScheduleManagement{
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        while(t-->0){
            int n = sc.nextInt();
            int m = sc.nextInt();

            long[]cnt = new long[n+1];
            for(int i=0;i<m;i++){
                int x = sc.nextInt();
                cnt[x]++;
            }

            long l=0;
            long r = 2L*m;
            long ans = r;


            while(l<=r){
                long mid = l+(r-l)/2;
                if(can(mid,cnt,n)){
                    ans = mid;
                    r = mid-1;
                }
                else{
                    l = mid+1;
                }
            }
            System.out.println(ans);

        }
    }
    public static boolean can(long k, long[]cnt, int n){
        long need=0;
        long free=0;
        for(int i=1;i<=n;i++){
            if(cnt[i]>k){
                need += cnt[i]-k;
            }
            else{
                free +=  (k-cnt[i])/2;
            }
        }
        return free>=need;
    }
}
