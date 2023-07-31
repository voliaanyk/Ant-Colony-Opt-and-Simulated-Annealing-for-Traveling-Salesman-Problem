# NEA PROJECT REPORT
## 1. ANALYSIS
### 1.1 What is the problem and why am I trying to solve it?

The problem I want to solve is the **Travelling Salesman problem (TSP)** using **Ant Colony Optimization (ACO)**. **TSP** is a well-known NP-hard optimization problem in combinatorial computer science. The TSP has the following statement: *"Given a list of cities and the distances between cities (weighted graph), what is the shortest route that visits each city exactly once and returns to the starting city?"*. 

The problem has important practical applications in real world, such as optimizing delivery routes, reducing travel costs, and improving resource allocation. I want to solve this problem because it is a challenging and intellectually stimulating problem, important in theoretical computer science. And I'm very interested in solving challenging theoretical computer science problems. Also, this allows me to explore biology inspired optimization algorithms and research further into a specific algorithm such as ACO. 

Moreover, the Travelling Salesman Problem is an NP-hard (nondeterministic polynomial time) problem; in simple words, there is no algorithm that can find the exact solution in a relatively short time, and most probably there will never be. The only way to solve the Salesman Traveling problem for large problem sizes is to find an approximate solution. However, by developing my method of solving the TSP with the use of ACO, I can improve the efficiency and accuracy of existing algorithms and make a real contribution to theoretical computer science, and this part really excites me.

Also, I want to build a visualization of the Ant Colony Optimization algorothm, so that it is easier to understand how it works for people who have no background in biology inspired algorithms. Furthermore, this visualization can then become a useful learning tool for students who want to specialize in this field.


### 1.2 Interview with a primary user

There are many algorithms to solve the TSP. The most common ones are:
1. **Exact algortihms**
    <br> *Work fast only on small problem sizes but guarantee the optimal solution.*
     - ***Held-Karp Algorithm (Dynamic Programming)***
    <br> This algorithm breaks the graph down into smaller problems and builds up to the optimal solution. 
    <br> The time complexity is $O(n^2 \times 2^n)$
    - ***Branch and Bound***
    <br> For current node, we calculate the bound on the best possible solution we can get if we go down this node. If this bound is worse than the current best solution, we ignore the node. 
    <br> The time complexity is $O(n^2 \times 2^n)$
    
2. **Heuristic algorithms**
    <br> *Heuristic algorithms work fast on bigger problem sizes, but produce an approximate solution.*
    - ***Nearest neighbour (NN) algorithm (greedy algorithm)***
    <br> Always chooses the closest unvisited city as it next destination. For N cities randomly distributed on a plane, the path chosen by the NN algorithm is on average 25% longer than the shortest possible path.
    <br> The time complexity is $O(n^2)$
    - ***Inserion Heuristics***
    <br> At the step *k* takes a sub-tour of the first *k* nodes and decides which one of the remaining *n-k* nodes should be inserted into the route and where it should be inserted. Can often find solution that are within a reasonable persentage of the optimal solution, expecially for small problem instances.
    <br> The time complexity can range from $O(n^2)$ to $O(n^3)$ depending on the type of the algorithm.
    
3. Genetic algortihms
4. Art Colony Optimization (ACO)
5. Simulated Annealing
6. Reinforcement learning
