import java.util.*;

public class MonsterGame {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();

        while (t-- > 0) {
            int n = sc.nextInt();

            int[] strengths = new int[n];
            for (int i = 0; i < n; i++) {
                strengths[i] = sc.nextInt();
            }

            int[] strikes = new int[n];
            for (int i = 0; i < n; i++) {
                strikes[i] = sc.nextInt();
            }

            Arrays.sort(strengths);

            long ans = 0;

            for (int i = 0; i < n; i++) {
                int x = strengths[i];

                
                int idx = lowerBound(strengths, x);

                int total = n - idx; 
                int remaining = total;

                int levels = 0;

                for (int j = 0; j < n; j++) {
                    if (remaining >= strikes[j]) {
                        remaining -= strikes[j];
                        levels++;
                    } else {
                        break;
                    }
                }

                long score = (long) x * levels;
                ans = Math.max(ans, score);
            }

            System.out.println(ans);
        }
    }

    
    static int lowerBound(int[] arr, int target) {
        int l = 0, r = arr.length;
        while (l < r) {
            int mid = (l + r) / 2;
            if (arr[mid] >= target) r = mid;
            else l = mid + 1;
        }
        return l;
    }
}

