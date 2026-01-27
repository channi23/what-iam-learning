# Number of Islands -- 4 directional can be done with 8-directional too

you can find this problem in leetcode-200 which has the same title Number of islands where basically we are just given a grid which has '1' and '0' s where 
'1' represents land and '0' represent water 

basically an island is something which is covered all sides by water, also need to take care of the 0th index and the last index of the array and be default before them
and after them in the grid is also considered as water as they are out of bounds.

if you can see the question clearly it is just a another variation of finding number of connected components...

### I have written the code in ts:


```typescript

function numIslands(grid: string[][]): number {
    const n:number = grid.length;
    const m:number = grid[0].length;
    const dirs:[number,number][] =[
        [1,0],
        [-1,0],
        [0,1],
        [0,-1],
    ];
    let count:number = 0;
    const visited: boolean[][] = Array.from(
        {length:grid.length},
        ()=> Array(m).fill(false)
    );
    const queue: [number, number][] = [];
    let head=0;

    for(let i=0;i<n;i++){
        for(let j=0;j<m;j++){
            if(grid[i][j]=='1' && !visited[i][j]){
                count++;
                visited[i][j] = true;
                queue.push([i, j]);

                while(head<queue.length){
                    const[r,c] = queue[head++];
                    // i need to check the neighbors in here
                    for(const [dr,dc] of dirs){
                        const nr = r+dr;
                        const nc = c+dc;

                        if(nr<0||nc<0 ||nr>=grid.length ||nc>=grid[0].length) continue;
                        if(grid[nr][nc]==='1' && !visited[nr][nc]){
                            visited[nr][nc] = true;
                            queue.push([nr,nc]);
                        }
                    }
                }
            }
        }
    }
    return count;


};

```
