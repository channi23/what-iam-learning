import java.util.*;

public class Worms {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int[] arr = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            arr[i] = sc.nextInt();
        }

        int jpussy = sc.nextInt();
        int[] squirts = new int[jpussy];
        for (int i = 0; i < jpussy; i++) {
            squirts[i] = sc.nextInt();
        }

        int[] pre = new int[n + 1];
        pre[1] = arr[1];
        for (int i = 2; i <= n; i++) {
            pre[i] = pre[i - 1] + arr[i];
        }

        for (int q : squirts) {
            int pile = bs(pre, arr, q);
            System.out.println(pile);
        }
    }

    public static int bs(int[] pre, int[] arr, int target) {
        int left = 1;
        int right = pre.length - 1;   
        int ans = 0;

        while (left <= right) {       // allow last index check
            int mid = left + (right - left) / 2;  // fixed mid

            if (target <= pre[mid]) {
                ans = mid;
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return ans;
    }
}
