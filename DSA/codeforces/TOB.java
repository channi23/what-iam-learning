import java.util.*;

public class TOB {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int t = sc.nextInt();
        while (t-- > 0) {
            int n = sc.nextInt();
            int m = sc.nextInt();
            int d = sc.nextInt();

            // max boxes in one tower
            int k = d / m + 1;

            
            int towers = (n + k - 1) / k;

            System.out.println(towers);
        }
    }
}
