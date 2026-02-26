import java.util.*;

public class BN {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();

        while (t-- > 0) {
            String s = sc.next();
            int sum = 0;
            List<Integer> reductions = new ArrayList<>();

            for (int i = 0; i < s.length(); i++) {
                int d = s.charAt(i) - '0';
                sum += d;
                if (i == 0) {
                    if (d > 1) reductions.add(d - 1);
                } else {
                    
                    if (d > 0) reductions.add(d);
                }
            }

            if (sum <= 9) {
                System.out.println(0);
                continue;
            }

            
            reductions.sort(Collections.reverseOrder());

            int moves = 0;
            for (int r : reductions) {
                sum -= r;
                moves++;
                if (sum <= 9) break;
            }

            System.out.println(moves);
        }
    }
}

