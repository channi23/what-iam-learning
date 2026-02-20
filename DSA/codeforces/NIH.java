import java.util.*;

public class NIH {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();

        while (t-- > 0) {
            String s1 = sc.next();
            String s2 = sc.next();

            int[] freq = new int[26];

            for (char c : s2.toCharArray()) {
                freq[c - 'a']++;
            }
            for (char c : s1.toCharArray()) {
                freq[c - 'a']--;
            }

            boolean possible = true;
            for (int i = 0; i < 26; i++) {
                if (freq[i] < 0) {
                    System.out.println("Impossible");
                    possible = false;
                    break;
                }
            }
            if (!possible) continue;

            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < 26; i++) {
                while (freq[i] > 0) {
                    sb.append((char) (i + 'a'));
                    freq[i]--;
                }
            }

            StringBuilder res = new StringBuilder();
            int p1 = 0, p2 = 0;

            while (p1 < s1.length() && p2 < sb.length()) {
                if (s1.charAt(p1) <= sb.charAt(p2)) {
                    res.append(s1.charAt(p1++));
                } 
                else if (s1.charAt(p1) > sb.charAt(p2)) {
                    res.append(sb.charAt(p2++));
                }
                
                
            }

            while (p1 < s1.length()) {
                res.append(s1.charAt(p1++));
            }

            while (p2 < sb.length()) {
                res.append(sb.charAt(p2++));
            }

            System.out.println(res.toString());
        }
    }
}
