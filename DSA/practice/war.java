//first number of allowed moves which are basically one, so 


//basically for every level we have three possiblities for n*3


import java.util.*;

public class war {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();

        if (n == 1) {
            System.out.println(0);
            return;
        }

        Queue<Integer> q = new LinkedList<>();
        HashSet<Integer> visited = new HashSet<>();

        q.add(n);
        visited.add(n);

        int moves = 0;

        while (!q.isEmpty()) {
            int size = q.size();

            for (int i = 0; i < size; i++) {
                int curr = q.poll();

                int m1 = curr - 1;
                int m2 = curr - curr/2;
                int m3 = curr - 2*curr/3;

                if (m1 == 1 || m2 == 1 || m3 == 1) {
                    System.out.println(moves + 1);
                    return;
                }

                int[] next = {m1, m2, m3};

                for (int nb : next) {
                    if (nb > 0 && !visited.contains(nb)) {
                        visited.add(nb);
                        q.add(nb);
                    }
                }
            }

            moves++;
        }

        System.out.println(moves);
    }
}
