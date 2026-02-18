import java.util.*;

public class ReplaceAndSum {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();

        while (t-- > 0) {
            int n = sc.nextInt();
            int q = sc.nextInt();

            int[] a = new int[n + 1];
            int[] b = new int[n + 1];

            for (int i = 1; i <= n; i++) a[i] = sc.nextInt();
            for (int i = 1; i <= n; i++) b[i] = sc.nextInt();

            long[] prefix = new long[n + 1];

            int best = 0;

            
            for (int i = n; i >= 1; i--) {
                best = Math.max(best, a[i]);
                best = Math.max(best, b[i]);
                prefix[i] = best;
            }

            
            for (int i = 1; i <= n; i++) {
                prefix[i] += prefix[i - 1];
            }

        
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < q; i++) {
                int l = sc.nextInt();
                int r = sc.nextInt();
                long res = prefix[r] - prefix[l - 1];
                sb.append(res).append(" ");
            }

            System.out.println(sb.toString().trim());
        }
    }
}


