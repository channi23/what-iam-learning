import java.util.*;
public class Dragons{
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        int s = sc.nextInt(); //intial strength
        int n = sc.nextInt();

        int[][]dragons = new int[n][2];

        for(int i=0;i<n;i++){
            dragons[i][0] = sc.nextInt();
            dragons[i][1] = sc.nextInt();
        }
        //okay the point now here is how can defeat those dragons which are weaker so i need to sort the dragons in ascending order, for that if i can beat them, then i can continue in the level

        //let me use the comparator to sort the dragons

        Arrays.sort(dragons,(a,b)->a[0]-b[0]);

        for(int i=0;i<n;i++){
            //if any point if time if the strength of the dragon is greater than the kirito's strength then we should print no and break

            if(s<=dragons[i][0]){
                System.out.println("NO");
                return;
            }
            s += dragons[i][1];
        }
        System.out.println("YES");


    }
}
