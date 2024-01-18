from common import *
from aco import *
import matplotlib.pyplot as plt
import math
import random
from sa import *

def generate_random_tsp(n):
    coordinates = [(random.uniform(0, 100), random.uniform(0, 100)) for _ in range(n)]
    
    dist = [[0 if i == j else math.dist(coordinates[i], coordinates[j]) 
             for j in range(n)] for i in range(n)]
    
    return TSP_input(n, dist, coordinates)


def visualize_routes(route1, route2, points):
    plt.figure()
    
    for i in range(-1, len(route1) - 1):
        plt.plot([points[route1[i]][0], points[route1[i+1]][0]],
                 [points[route1[i]][1], points[route1[i+1]][1]], 'pink')
    
    for i in range(-1, len(route2) - 1):
        plt.plot([points[route2[i]][0], points[route2[i+1]][0]],
                 [points[route2[i]][1], points[route2[i+1]][1]], 'orange')
    
    plt.scatter(*zip(*points), s=100, c='purple', marker='o')
    plt.show()
    
    

def main():
    
    n_cities = 20
    tsp_input = generate_random_tsp(n_cities)

    parameters = ACO_parameters(2, 3, 100, 0.6, 25, 100, 0)
    sa_parameters = SA_parameters(0.92, 10000, 1000)
    
    
    best, found, route = solve_aco(tsp_input, parameters)
    sa_best, sa_found, sa_route = solve_sa(tsp_input, sa_parameters)
    
    print("ACO best: ", str(best), " found: ", str(found))
    print("SA best: ", str(sa_best), " found: ", str(sa_found))
    visualize_routes(route, sa_route, tsp_input.coordinates)


def test_sa():
    n_cities = 20
    tsp_input = generate_random_tsp(n_cities)
    sa_parameters = SA_parameters(0.97, 3000, 1000)
    
    solve_sa_with_display(tsp_input, sa_parameters)


main()