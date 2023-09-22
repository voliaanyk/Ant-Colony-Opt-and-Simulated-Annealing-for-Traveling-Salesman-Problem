# DOCUMENTED DESIGN

## Algorithms

### Exact algorithm

There are different exact algorithms that can be used for solving TSP. I have chosen to use Held-Karp algorithm which is a dynamic approach with $O(n^2 \times 2^n)$ complexity, so it's more efficient than brute-force algorithms with $O(n!)$ complexity. 
The main idea of Held-Karp is to compute the shortest tour length for all subsets of cities that end at a specific city. Here's the solution:

$dp[S][v]$ - the shortest path from $1$ to $v$ that visits all cities in subset $S$
at the start all $dp[S][v]=$&infin; and $dp[{i}][i]=0$ as the length of the path that visits one city only is $0$
$dist[v1][v2]$ - the distance table 

Pseudo code:

>for $size$ from $2$ to $n-1$:<br>
    >>for all $S$ &sube; {$2,3,..,n$} and $|S|$ = $size$: <br>
        >>>for all $v∈S$: <br>
            >>>>$dp[S][v]$ = $min$ $[g(S\setminus\{v\}, m) + dist[m][v]]$ (for all $m$&ne;$v$, $m∈S$)
