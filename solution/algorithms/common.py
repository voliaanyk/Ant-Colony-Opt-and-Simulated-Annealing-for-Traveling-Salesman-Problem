

inf = 100000000000

class ACO_output():
    def __init__(self):
        self.n = 0
        self.n_ants = 0
        self.ant_route = []
        self.best_route = []
        self.pheromone = []
        self.length = 0
        
        
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
        