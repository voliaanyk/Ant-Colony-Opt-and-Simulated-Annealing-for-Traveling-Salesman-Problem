

inf = 100000000000
        
class TSP_input():
    def __init__(self, n, dist, coordinates):
        self.n = n
        self.dist = dist
        self.coordinates = coordinates


class ACO_parameters():
    def __init__(self, alpha, beta, Q, evaporation_rate, n_ants, iterations, shake):
        self.alpha = alpha
        self.beta = beta
        self.Q = Q
        self.evaporation_rate = evaporation_rate
        self.n_ants = n_ants
        self.iterations = iterations
        self.shake = shake
        
class ACO_output():
    def __init__(self, n, n_ants, ant_route, best_route, pheromone, cost):
        self.n = n
        self.n_ants = n_ants
        self.ant_route = ant_route
        self.best_route = best_route
        self.pheromone = pheromone
        self.cost = cost
        
        
class SA_parameters():
    def __init__(self, alpha, T, iterations):
        self.alpha = alpha
        self.T = T
        self.iterations = iterations
        
class SA_output():
    def __init__(self, T, path, cost):
        self.T = T
        self.path = path
        self.cost = cost
        
        