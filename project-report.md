# NEA PROJECT REPORT
## 1. ANALYSIS
### 1.1 What is the problem and why do I want to solve it?

The problem I want to solve is the **Travelling Salesman problem (TSP)** using **Ant Colony Optimization (ACO)**. **TSP** is a well-known NP-hard optimization problem in combinatorial computer science. The TSP has the following statement: *"Given a list of cities and the distances between cities (weighted graph), what is the shortest route that visits each city exactly once and returns to the starting city?"*. 

The problem has important practical applications in real world, such as optimizing delivery routes, reducing travel costs, and improving resource allocation. I want to solve this problem because it is a challenging and intellectually stimulating problem, important in theoretical computer science. And I'm very interested in solving challenging theoretical computer science problems. Also, this allows me to explore biology inspired optimization algorithms and research further into a specific algorithm such as ACO. 

Moreover, the Travelling Salesman Problem is an NP-hard (nondeterministic polynomial time) problem; in simple words, there is no algorithm that can find the exact solution in a relatively short time, and most probably there will never be. The only way to solve the Salesman Traveling problem for large problem sizes is to find an approximate solution. However, by developing my method of solving the TSP with the use of ACO, I can surpass the efficiency and accuracy of existing algorithms and make a real contribution to theoretical computer science, and this part really excites me.

Also, I want to build a visualization of the Ant Colony Optimization algorothm, so that it is easier to understand how it works for people who have no background in biology inspired algorithms. Furthermore, this visualization can then become a useful learning tool for students who want to specialize in this field.


### 1.2 Interview with a primary user

### 1.3 Data from survey of prospective users



### 1.4 List of user requirements

### 1.5 Background analysis

### 1.6 Analysis of current systems (2 systems)

### 1.7 Table of objectives

### 1.8 Modelling (eg. basic high level overview, hierarchy diagram, overview of how most complex part could be implemented) 









## drafts for future

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

3. **Genetic Algorithms**
   - *Work well on larger problem sizes and provide good approximate solutions.*
   - **Description:** Genetic Algorithms are inspired by the process of natural selection and evolution. The algorithm starts with a population of potential solutions (chromosomes). Each solution represents a possible tour. These solutions undergo reproduction, crossover (recombination), mutation, and selection to produce new generations of solutions. Over generations, the solutions tend to improve in quality. The process continues until a stopping criterion is met.
   - **Time Complexity:** Genetic algorithms can be efficient in practice for large problem sizes but can vary based on the implementation and problem complexity.

4. **Ant Colony Optimization (ACO)**
   - *Well-suited for large problem sizes and often provide good approximate solutions.*
   - **Description:** ACO is inspired by the foraging behavior of ants. The algorithm simulates a colony of artificial ants that traverse the graph (cities) while depositing pheromones on the edges they traverse. The pheromone trail guides other ants' decisions, and over time, paths with stronger pheromone concentrations are more likely to be chosen. The algorithm exploits the concept of positive feedback to find good solutions.
   - **Time Complexity:** ACO's time complexity is generally moderate, but it can be influenced by the number of ants and iterations.

5. **Simulated Annealing**
   - *Works well on small to medium-sized problem instances and provides good approximate solutions.*
   - **Description:** Simulated Annealing is inspired by the annealing process in metallurgy. The algorithm starts with an initial solution and then iteratively explores neighboring solutions. It allows moves that lead to worse solutions with a probability that decreases over time (similar to decreasing temperature in annealing). This probabilistic approach allows the algorithm to escape local optima and continue searching for better solutions.
   - **Time Complexity:** Simulated Annealing's time complexity depends on the number of iterations and the cooling schedule but is generally moderate for small to medium-sized instances.

6. **Reinforcement Learning**
   - *Potential to work on larger problem sizes, but efficiency depends on the complexity of the learning process.*
   - **Description:** Reinforcement Learning is a type of machine learning where an agent learns to make decisions by interacting with an environment. In the context of TSP, the agent (salesman) learns to navigate the cities and receives positive or negative rewards based on the quality of the tour (shorter or longer). The agent updates its policy based on the rewards received and aims to improve its tour over time.
   - **Time Complexity:** The time complexity of reinforcement learning algorithms can vary significantly depending on the specific approach, learning rate, and the complexity of the problem.

Remember that these algorithms provide approximate solutions and may not guarantee the optimal solution, but they are useful when finding an optimal solution is computationally infeasible for large problem instances.
