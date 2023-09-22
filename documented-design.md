# DOCUMENTED DESIGN

## Algorithms

### Exact algorithm

There are different exact algorithms that can be used for solving TSP. I have chosen to use Held-Karp algorithm which is a dynamic approach with $O(n^2 \times 2^n)$ complexity, so it's more efficient than brute-force algorithms with $O(n!)$ complexity. 
The main idea of Held-Karp is to compute the shortest tour length for all subsets of cities that end at a specific city. Here's the solution:

$dp[S][v]$ - the shortest path from $1$ to $v$ that visits all cities in subset $S$
at the start all $dp[S][v]=$&infin; and $dp[\{i\}][i]=0$ as the length of the path that visits one city only is $0$ <br>
$dist[v1][v2]$ - the distance table 

#### Pseudo code:

for $s$ from $2$ to $n-1$:<br>
&nbsp;&nbsp;      for all $S$ &sube; {2,3,..,n} and $|S|$ = $s$: <br>
&nbsp; &nbsp; &nbsp; &nbsp;         for all $v∈S$: <br>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;             $dp[S][v]$ = $min$ $\{dp[S\setminus\{v\}][u] + dist[u][v]\}$ (for all $u$&ne;$v$, $u∈S$)

 $S = \{2, 3, ..., n\}$ <br>
min_dist = min over all $j$ in $S$: <br>
&nbsp; &nbsp; $dp[S][j] + dist[j, 1]$


#### Explanation

This is a recursive algorithm that uses memoization technique. The base case is $dp[\{i\}][i]=0$. The algorithm calculates $dp[S][v]$ for $S$ of size $s$ after it did the same for all sets of size $s-1$. The shortest path from $1$ to $v$ that visits all cities in subset $S$ is equal to the minimum possible distance among all valid paths. To compute this, we consider all possible choices for the last city visited before reaching $v$. Let's denote this last city as $u$, where $u$ is an element of subset $S$, and $u ≠ v$. 

1. We want to find the minimum distance from vertex 1 to v while visiting all cities in S, so we consider $dp[S\setminus\{v\}][u]$, which represents the shortest path from vertex 1 to u while visiting all cities in $S\setminus\{v\}$
2. To complete the path, we add the distance from u to v, denoted as $dist[u][v]$  in the algorithm. This distance represents the direct connection between u and v in the input graph.
3. The total distance is then $dp[S\setminus\{v\}][u] + dist[u][v]$ 
4. We calculate this value for all possible choices of u in S, and we choose the minimum of these values.

The solution to TSP is found by selecting the minimum distance among the paths that start at vertex 1, visit all cities exactly once, and return to the starting city which is $dp[S][j] + dist[j, 1]$, so we run a cycle for j to find it