import java.util.*;

class Solution {
    public int countGoodSubseq(int[] nums, int p, int[][] queries) {
        int n = nums.length;

        Map<Integer, Integer> freq = new HashMap<>();
        int cnt = 0;

        for (int x : nums) {
            if (x % p == 0) {
                int v = x / p;
                freq.put(v, freq.getOrDefault(v, 0) + 1);
                cnt++;
            }
        }

        int good = 0;

        for (int[] q : queries) {
            int i = q[0], val = q[1];

            if (nums[i] % p == 0) {
                int v = nums[i] / p;
                freq.put(v, freq.get(v) - 1);
                if (freq.get(v) == 0) freq.remove(v);
                cnt--;
            }

            nums[i] = val;

            if (val % p == 0) {
                int v = val / p;
                freq.put(v, freq.getOrDefault(v, 0) + 1);
                cnt++;
            }

            boolean ok = false;

            if (cnt > 0 && cnt < n && freq.containsKey(1)) {
                ok = true;
            }

            if (!ok && cnt >= 2 && cnt < n) {
                Set<Integer> gcdSet = new HashSet<>();

                for (int v : freq.keySet()) {
                    Set<Integer> next = new HashSet<>();
                    next.add(v);

                    for (int g : gcdSet) {
                        next.add(gcd(g, v));
                    }

                    gcdSet.addAll(next);
                }

                if (gcdSet.contains(1)) ok = true;
            }

            if (ok) good++;
        }

        return good;
    }

    private int gcd(int a, int b) {
        if (b == 0) return a;
        return gcd(b, a % b);
    }
}
