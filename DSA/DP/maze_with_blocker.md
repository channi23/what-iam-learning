# Maze With  Blockers DP problem:

So basically the question states that a maze is given which is N*N where few cells are blocked, now we need to find the number of ways to reach [n,n] in the maze , so i we can start at [0,0] then we can only move either right or down, so basically we can go to
(i,j+1) and (i+1,j)

### DP State
 dp[i][j] = number of ways to reach (i,j) starting from (0,0)

### Base Case
dp[0][j] =1 (for all j ->0->n)   
                                    because we only have one way in them
dp[i][0] =1 (for all i->0->n)

### DP Expression

dp[i][j] = 0 when the cell is blocked

else

dp[i][j] = dp[i-1][j]+dp[i][j-1]

then after we need to return dp[n][n]


## Type-B

If in the maze there is no cell is blocker to find the number ways we can reach the (n,n) from (0,0) can we found by doing
2nCn --> 2n!/(2n-n)!*n!

## Type-C

Here we have a 2d maze where each cell has Aij number of apples, we need to find the maximum number of apples we can collect on our path from (0,0) to (N,N) 

### DP state 

dp[i][j] = Maximum number of apples we can collect in interim path from (0,0) to(i,j)

### Base case

dp[0][0] = A[0][0]
dp[0][j] = dp[0][j-1]+A[0][j]
dp[i][0] = dp[i-1][0]+A[i][0]

### DP Expression

dp[i][j] = Math.max(dp[i-1][j],dp[i][j-1])+A[i][j]

finally we can return the max value dp[n-1][n-1]



