from common import *
from aco import *
import matplotlib.pyplot as plt
import math
import random

def generate_random_tsp(n):
    coordinates = [(random.uniform(0, 100), random.uniform(0, 100)) for _ in range(n)]
    
    dist = [[0 if i == j else math.dist(coordinates[i], coordinates[j]) 
             for j in range(n)] for i in range(n)]
    
    return TSP_input(n, dist, coordinates)


def visualize_route(route, points):
    plt.figure()
    for i in range(-1, len(route) - 1):
        plt.plot([points[route[i]][0], points[route[i+1]][0]],
                 [points[route[i]][1], points[route[i+1]][1]], 'b')
    plt.scatter(*zip(*points), s=100, c='red', marker='o')
    plt.show()

def main():
    
    n_cities = 20
    tsp_input = generate_random_tsp(n_cities)

    parameters = ACO_parameters(2, 3, 100, 0.6, 25, 100, 0)
    
    
    best, found, route = solve_aco(tsp_input, parameters)
    print("ACO best: ", str(best), " found: ", str(found))
    visualize_route(route, tsp_input.coordinates)



main()