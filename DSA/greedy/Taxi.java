import java.util.*;

public class Taxi{
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int cars=0;
        int c1=0,c2=0,c3=0,c4=0;
        for(int i=0;i<n;i++){
            int count = sc.nextInt();
            if(count==1){
                c1++;
            }
            else if(count==2){
                c2++;
            }
            else if(count==3){
                c3++;
            }
            else{
                c4++;
            }
        }
        cars+=c4;
        cars+=c3;

        c1 = Math.max(0,c1-c3);

        cars+= c2/2;

        if(c2%2==1){
            cars++;
            c1 = Math.max(0,c1-2);
        }

        cars += Math.ceil(c1/4);
        System.out.println(cars);

    }
}
