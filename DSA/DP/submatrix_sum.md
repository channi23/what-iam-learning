# Submatrix Sum :
## Given a 2D matrix, you have to answer queries of the form: (i,j,k,l), that means, you have to report the sum of the submatrix(i,j) to (k,l) where (i,j) denotes top-left corner of the submatrix and (k,l) denotes bottom-right corner of the submatrix.

### Solution:

#### DP State: dp[i][j] = submatrix sum from (0,0) to (i,j)

#### Pseudo code

dp[0][0] = A[0][0]
dp[i][0] = dp[i-1][0]+A[i][0] {from i to n-1}
dp[0][j] = dp[0][j-1]+A[0][j] {from j to n-1}

for i in range(1,n):
    for j in range(1,n):
        dp[i][j] = dp[i-1][j]+dp[i][j-1] - dp[i-1][j-1] + A[i][j]

now to get the submatrix sum:

Sum = dp[k][l] - dp[i-1][l] - dp[k][j-1]+dp[i-1][j-1];

