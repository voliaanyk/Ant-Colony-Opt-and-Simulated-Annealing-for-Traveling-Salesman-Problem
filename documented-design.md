# DOCUMENTED DESIGN

## Algorithms

### Exact algorithm

There are different exact algorithms that can be used for solving TSP. I have chosen to use Held-Karp algorithm which is a dynamic approach with $O(n^2 \times 2^n)$ complexity, so it's more efficient than brute-force algorithms with $O(n!)$ complexity.
The main idea of Held-Karp is to compute the shortest tour length for all subsets of cities that end at a specific city. Here's the solution:

$dp[S][v]$ - the shortest path from $1$ to $v$ that visits all cities in subset $S$
at the start all $dp[S][v]=$&infin; and $dp[1][0]=0$ as the length of the path that visits the first city only is $0$

$dist[v1][v2]$ - the distance table

#### Pseudo code:

for $s$ from $2$ to $n-1$:

&nbsp;&nbsp;      for all $S$ &sube; {2,3,..,n} and $|S|$ = $s$:

&nbsp; &nbsp; &nbsp; &nbsp;         for all $v∈S$:

&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;             $dp[S][v]$ = $min$ $\(dp[S\setminus\{v\}][u] + dist[u][v]\)$ (for all $u \neq v$, $u∈S$)

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

For this algorithm I'm going to use bitmasks. Bitmask is a binary number that represents a subset of a set. If the number has 1 at a point x (that is $2^x$ bit), then element number x in the superset is included in the subset.
<br><br>
**Example:**

4 3 2 1 0

1 0 0 1 1  = 16 + 2 + 1 = 19

So bitmask 19 represents a subset {0, 1, 4}
<br><br>
**Some binary operations in C++:**

1<<n - shift of 1, n times to the left

x\^y - x xor y

mask & (1<<x) - returns 1 if element x is in the subset represented by bitmask

mask ^ (1<<x) - bitmask that represents S\x
<br><br><br>
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

Simulated annealing is inspired by process of annealing in metallurgy when at first the temperature is raised to high temperature, and then gradually decreased. In Simulated Annealing, when the temperature is high, larger random changes are made, avoiding the risk of becoming trapped in a local minimum. And as the temperature decreases, the probability of accepting worse solution reduces exponentially, allowing the algorithm to converge towards an optimal or near-optimal solution.

#### Initializaion

At first a random solution to TSP is chosen as a current state, $s$; and the initial temperature, $T$, is set.

#### Iteration

At each iteration algorithm probabilistically decides wether to stay in the current state $s$, or move to a neighbour state $s*$.

If cost of $s*$ is less than cost of $s$, then $s*$ is accepted. Cost of a certain state is the price/length of the solution (aka length of the route)

If cost of $s*$ is bigger than cost of $s$ (new solution is worse), then $s*$ is accepted with probability $P$

$P = e^{-ΔC/T}$,

where $ΔC$ is $Cost(s*) - Cost(s)$ and $T$ is the current teperature and change is accepted if $P > random(0,1)$

This is repeated until the stopping critea is satisfied (such as the Temperature drops below Critical Temperature, or the maximum number of iteration is reached)

#### Neighbouring states

In my implemetaton of Simulated Annealing I'm going to use three methods of state modification:

1. **Swap.** Swaping 2 random cities in a route
2. **Reverse.** Reversing a random segment
3. **Insertion.** Inserting a random city into a random place in te route

#### Cooling

There are two ways of decreasing Temperature in Simulated Annealing:

- Exponential. $T = \alpha * T$
- Linear. $T = T - ΔT$

I'm going to use exponential decrease as it usualy shows better results for Traveling Salesman Problem

#### Varying parameters

Similar to Ant Colony, Simulated Annealing has parameters that can be varied such as initial temperature $T$, exponential decrease $\alpha$, number of iterations / critical temperature.

These parameters will affect Simulated Annealing perfomance on TSP, so we need to add the opprtuinity to vary them on the website for better understanding of the algorithm.

## Visualisation design

The visualisation is a website with a start page (with a fancy picture of a graph and a button "try"), a main page where users will be able to:

- create a graph (automatically or manualy)
- choose an algorithm they want to perform (either Ant Colony Optimisation or Simulated Annealing)
- vary parameters to see how they affect the performance
- choose if they want to see each iteration or fast-forward to see the answer straight away
- adjust the speed
- see outputs of all the other algorithms (inclusing the Held-Karp algorithm)
- display a simple user guide

I plan to code all of this using the simplest tools and languages such as HTML, CSS, JavaScript (because I have some previous experience in those languages and feel emotiomaly attached), and also exploring frameworks and JS libraries for doing more complex things (like Sigma.js for graph visualisation and vue.js for building user interface).

### Start page

The design of the start page is below. 

![start page](images/documented-design/start_page.png)

The graph symbolises ACO (in the form of ants on the left side) and Simulated Annealing (fire on the right side). The start page also contains a button "try", that will lead to the main page when pressed; and an additional information icon that will show some context and basic description of what the visualisation.

### Main page

![main page](images/documented-design/main_page.png)

## Bringing it all together

At first I was going to implement algorithms in C++, because this way they would be as fast as they can get. But then, after a carefull consideration, I've changed my mind to Python mainly for its wider functionality. Python has frameworks like Flask (Web Application Framework) and Python functions can be uploaded to Google Cloud Platrofm (this is not the case for C++) and then be triggered from the website, which makes everything much easier.

### Flask

Flask is a light framework, which means that it's fast and efficient. Furthermore, it's very easy to learn and understand it. For example this is code that returns "Hello world" when you navigate to https:/`<domain>`/hello_world

```
from flask import Flask
app = Flask(__name__)

@app.route('/hello_world')
def hello_world():
    return 'Hello World!'

if __name__ == '__main__':
    app.run()
```

I'm going to create 3 functions in Flask, for Held-Karp, Ant Colony Optimisation, and Simulated Annealing. These functions will simply fetch the information and send the output of the corresponding algorithm back to the web application.

### Google Cloud Platform

Google Cloud Platform (GCP) Console is a useful tool for deploying functions of different purposes, including triggered functions. When a function like that is deployed to GCP, it gives back a URL for triggering the function. To trigger a certain function from the deployed file you simply have to send a request to

`gcp_url/function_name?data=your_data`
