from common import *
import numpy as np
import random

class Graph():
    def __init__(self, n, dist): #n - number of cities, dist - distance matrix

        if n==0: # check if any cities are given
            return "No cities are given"
        if n!=len(dist) or n!=len(dist[0]): #check if the size of matrix is correct
            return "The size of the distance matrix isn't correct"


        self.n = n
        for i in range(n):
            for j in range(n):   
                if i == j:   dist[i][j] = inf

        self.dist = dist
    

class State():
    def __init__(self, graph, **kwargs):
        type = kwargs['type']

        if type == "random": #if a random state has to be generated, use the generate_random_state() function
            self.generate_random_state(graph)

        elif type == "neighbour": #if a neighbouring state has to be generated, retrieve the current state attrbute and modify it to create a different state
            current_state = kwargs["current_state"]
            self.path = current_state.path
            self.generate_neighbour_state(graph)
        
        else:
            return
        
        self.calculate_cost(graph) # finaly, calculate the cost of the state
    

    def calculate_cost(self, graph):
        self.cost = 0 #initialise cost as 0
        for i in range(1, len(self.path)):
            self.cost += graph.dist[self.path[i]][self.path[i-1]] #add the weight of each edge in the path
        
    
    def generate_random_state(self, graph):
        n = graph.n
        array = np.array(list(range(n))) #generate an array [0, 1, 2, ..., n]
        path = np.random.permutation(array) #shuffle the array to create a random path
        path.append(path[0]) #append the first node to the end to create a cycle

        self.path = path
    
    def generate_neighbour_state(self, graph):

        self.path = self.path[:-1] #cut the last node as it's a repeat of the first node 

        x = random.randint(1, 3) #generate a random number to choose one of 3 modifications
        if x==1:
            self.swap_two_nodes()
        elif x==2:
            self.reverse_segment()
        elif x==3:
            self.insert_random_node()
        
        self.path.append(self.path[0]) #append the fist node to the end to create a cycle

    
    def swap_two_nodes(self):
        index = random.randint(0, len(self.path)-2) #choose a random index
        self.path[index], self.path[index+1] = self.path[index+1], self.path[index] #swap 2 neighbouring nodes
    
    def reverse_segment(self):
        #choose 2 distinct random numbers from 0 to n-1 (we're using sample function so that they are distinct)
        index1, index2 = random.sample(range(len(self.path)), 2) 
        start, end = min(index1, index2), max(index1, index2) #assign start and end of the segment

        self.path[start:end+1] = reversed(self.path[start:end+1]) #reverse the segment

    def insert_random_node(self):
        
        index_to_move = random.randint(0, len(self.path)-1) # Choose a random index for the item to be moved
        # Choose a random destination index different from the source index
        index_destination = random.choice([i for i in range(len(self.path)) if i != index_to_move])

        # Move the item to the new position
        item_to_move = self.path.pop(index_to_move)
        self.path.insert(index_destination, item_to_move)

class SA():
    def __init__(self, graph_params, sa_params):
        self.graph = Graph(graph_params.n, graph_params.dist)
        self.T = sa_params.t
        self.alpha = sa_params.alpha
        self.critical_t = sa_params.critical_t
    
    def iteration()