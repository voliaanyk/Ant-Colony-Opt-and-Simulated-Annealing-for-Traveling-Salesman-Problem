# Evaluation

List of objectives from the analysis:

1. **Explore the maths behind ACO and SA**
   *This is needed to implement ACO and SA in the next step*
2. **Implement ACO algorithm for TSP**
   1. should succesfully construct a route that visits each city and returns to the starting city
   2. should have input parameters that control its performance such as the number of ants, evaporation, iterations, etc.
   3. should return data about the best route after each iteration for the visualisation
   4. should be quick, efficient and accurate
3. **Implement Simulated Annealing**
   1. should succesfully construct a route that visits each city and returns to the starting city
   2. should have input parameters that control its performance such as initial temperature, alpha, etc.
   3. should return data about the best route, temperature, etc. after each iteration so that the visualisation can be created
   4. should be quick, efficient and accurate
4. **Implement an exact algorithm for TSP**
   *This algorithm should find the exact solution for TSP for smaller problem instances (for comparing to ACO and SA output)*
   1. should succesfully construct a route that visits each city and returns to the starting city and is the best possible route
   2. should return data about the best route and its cost
   3. should be a very efficient and fast implementation
5. **Create a visualisation of algorithms**
   *Create an informative and interactive interface that allows users with different level of expertise to interact with visualisation easily*
   1. visualisation of how the output of Ant Colony Optimization changes with each iteration
   2. visualisation of how the output of Simulated Annealing changes with each iteration
   3. make it possible to hide/show any visualisation
   4. provide the ability for users to customize ACO and SA parameters
   5. adjustable speed and pause functionality
   6. fast-forwarding through iterations
   7. showing important information such as the number of iteration, the best route and its length, and when it was found
   8. make it possible to generate cities, create cities via the interface
   9. show the exact best route found using an exact algorithm for smaller problem instances
6. **Link the algorithms and the visualisation**
   *Link the systems together so that the visualisation can be created*

| Objective | Description                                          | Was hit? | Where?                             |
| --------- | ---------------------------------------------------- | -------- | ---------------------------------- |
| 1         | explore maths behind aco, sa, and an exact algorithm | yes      | documented design -> algorithms    |
| 2.1       | aco constructs a valid route that is a tsp solution  | yes      | testing -> ACO -> results          |
| 2.2       | aco has input parameters                             | yes      | technical solution -> common.py    |
| 2.3       | aco returns data about every iteration               | yes      | technical solution -> aco.py       |
| 2.4       | aco is quick, efficient, and accurate                | yes      | testing -> ACO -> results          |
| 3.1       | sa constructs a valid route that is a tsp solution   | yes      | testing -> SA -> results           |
| 3.2       | sa has input parameters                              | yes      | technical solution -> common.py    |
| 3.3       | sa returns data about every iteration                | yes      | technical solution -> sa.py        |
| 3.4       | sa is quick, efficient, and accurate                 | yes      | testing -> SA -> results           |
| 4.1       | exact algorithm constructs the best possible route   | yes      | testing -> HK -> results           |
| 4.2       | exact algorithm return the route and its cost        | yes      | technical solution -> held_karp.py |
| 4.3       | exact algorithm is efficient and fast                | yes      | testing -> HK -> results           |
| 5         | create a visualisation                               | yes      |                                    |
| 6         | link back-end and front-end                          | yes      | technical solution -> app.py       |
