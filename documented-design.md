# DOCUMENTED DESIGN

## Algorithms

### Exact algorithm


There are different exact algorithms that can be used for solving TSP. I have chosen to use Held-Karp algorithm which is a dynamic approach with $O(n^2 \times 2^n)$ complexity, so it's more efficient than brute-force algorithms with $O(n!)$ complexity.
The main idea of Held-Karp is to compute the shortest tour length for all subsets of cities that end at a specific city. Here's the solution:

$dp[S][v]$ - the shortest path from $1$ to $v$ that visits all cities in subset $S$
at the start all $dp[S][v]=$&infin; and $dp[1][0]=0$ as the length of the path that visits the first city only is $0$  \<br>
$dist[v1][v2]$ - the distance table

#### Pseudo code:

for $s$ from $2$ to $n-1$: 


&nbsp;&nbsp;      for all $S$ &sube; {2,3,..,n} and $|S|$ = $s$:


&nbsp; &nbsp; &nbsp; &nbsp;         for all $v∈S$: \

&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;             $dp[S][v]$ = $min$ $\{dp[S\setminus\{v\}][u] + dist[u][v]\}$ (for all $u&ne;v$, $u∈S$) 


 $S = \{2, 3, ..., n\}$
min_dist = min over all $j$ in $S$:
&nbsp; &nbsp; $dp[S][j] + dist[j, 1]$

#### Explanation

This is a recursive algorithm that uses memoization technique. The base case is $dp[1][0]=0$. The algorithm calculates $dp[S][v]$ for $S$ of size $s$ after it did the same for all sets of size $s-1$. The shortest path from $1$ to $v$ that visits all cities in subset $S$ is equal to the minimum possible distance among all valid paths. To compute this, we consider all possible choices for the last city visited before reaching $v$. Let's denote this last city as $u$, where $u$ is an element of subset $S$, and $u ≠ v$.

1. We want to find the minimum distance from vertex 1 to v while visiting all cities in S, so we consider $dp[S\setminus\{v\}][u]$, which represents the shortest path from vertex 1 to u while visiting all cities in $S\setminus\{v\}$
2. To complete the path, we add the distance from u to v, denoted as $dist[u][v]$  in the algorithm. This distance represents the direct connection between u and v in the input graph.
3. The total distance is then $dp[S\setminus\{v\}][u] + dist[u][v]$
4. We calculate this value for all possible choices of u in S, and we choose the minimum of these values.

The solution to TSP is found by selecting the minimum distance among the paths that start at vertex 1, visit all cities exactly once, and return to the starting city which is $dp[S][j] + dist[j, 1]$, so we run a cycle for j to find it

#### Bitmasks

For this algorithm I'm going to use bitmasks. Bitmask is a binary number that represents a subset of a set. If the number has 1 at a point x (that is $2^x$ bit), then element number x in the superset is included in the subset.  `<br>`

Example: `<br>`

4 3 2 1 0 `<br>`
1 0 0 1 1  = 16 + 2 + 1 = 19 `<br>`
So bitmask 19 represents a subset {0, 1, 4} `<br>`

Some binary operations in C++: `<br>`

1<<n - shift of 1, n times to the left `<br>`
x\^y - x xor y  `<br>`
mask & (1<<x) - returns 1 if element x is in the subset represented by bitmask `<br>`
mask ^ (1<<x) - bitmask that represents S\x `<br>`



### Ant Colony Optimization


**Ant Colony Optimization** is an algorithm inspired by ants` behavior. The main idea is to model an ant colony, where at every iteration:

1. **Route construction.** Each ant will choose a route that visits each city once. The probability of choosing an edge for the route is dictated by the pheromone level of that edge
2. **Compare**. The route of ants are compared to each other using a cost function (for TSP optimal route is the shortest route)
3. **Update**. Pheromone levels of edges are updated by at first decreasing them by a pecentage and then increasing proportionally to the quality of the routes to which a certain edge belongs.

So let's consider each step in more detail


#### Initializaion

Create artificial ants (number of ants is an input parameter)

Set pheromone levels to small random values


#### Route construction

Each ant starts at a random city

At each step it will choose the next city to be visited based on the probabilistic function:

$P_{ij}^{(k)}$ = $\frac{{(\tau_{ij}^\alpha) \cdot (\eta_{ij}^\beta)}}{{\sum_{l \in allowedCities} (\tau_{il}^\alpha) \cdot (\eta_{il}^\beta)}}$

$P_{ij}^{(k)}$ is the probability for ant k to move from city i to city j

 $\tau_{ij}^\alpha$ is the pheromone level of the edge from city i to city j.

$\alpha$ and $\beta$ are parameters that control the influence of pheromone ($\alpha$) and a heuristic function ($\beta)$ on ant decisions.

$\eta_{ij}$ is the heuristic information, which can be based for example on the distance between city i and city j.

The denominator represents the sum of probabilities for all allowed cities.


#### Comparison

$\Delta\tau_{ij}^{(k)}$ is a change in the pheremone level of the edge from i to j, contributed by ant k

$\Delta\tau_{ij}^{(k)} = \frac{Q}{L^{(k)}}$

where Q is a constant representing total amount of pheromon contributed by ants

$L^{(k)}$ is the length of the route constructed by ant k


#### Update

After all the routes were constructed, pheromone levels of each edge are updated using this formula

$\tau_{ij} \leftarrow (1 - \rho) \cdot \tau_{ij} + \sum_{k=1}^{\text{numAnts}} \Delta\tau_{ij}^{(k)}$

where evaporation (decreasing all pheromone levels by a certain percentage) is this part:

$\tau_{ij} \leftarrow (1 - \rho) \cdot \tau_{ij}$ 

and pheromone update (in simple words adapting the pheromone levels of edges to the "goodness" of edges) is this part:

$\tau_{ij} \leftarrow  \tau_{ij} + \sum_{k=1}^{\text{numAnts}} \Delta\tau_{ij}^{(k)}$

$\rho$ is the evaporation rate 

$\Delta\tau_{ij}^{(k)}$ is a change in the pheremone level of the edge from i to j, contributed by ant k


#### Varying parameters

Number of ants, iterations, $\alpha$, $\beta$, $\eta_{ij}$, $Q$, $\rho$ are input parameters of ACO, so varying them can increase or decrease the algorithm performance, and they need to be tuned individually for each TSP problem instance.

We need to give the opporunity to change these parameters in UI so that users can explore how changing parameters may affect ACO performance.



### Simulated Annealing
