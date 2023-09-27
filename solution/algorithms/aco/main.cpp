#include <bits/stdc++.h>
using namespace std;

#include "common.h"

class Graph{
    public:
        int n, dist[max_n][max_n], heuristic[max_n][max_n], pheromone[max_n][max_n];
        Graph(tsp_input input){
            n = input.n;
            for(int i=0;i<n;i++){
                for(int j=0;j<n;j++){
                    if(i==j) input.dist[i][j] = inf;
                    dist[i][j] = input.dist[i][j];
                    heuristic[i][j] = dist[i][j];
                    pheromone[i][j] = random()%100/100;
                    if(i==j) pheromone[i][j] = 0;
                }
            }
        }
        int choose_first_city(){
            return random()%n;
        }
        int choose_next_city(vector<int> route, set<int> used, aco_input parameters){
            int l = route.size();
            int last_city = route[l-1];
            vector<int> probabilities;
            int sum_probabilities = 0;
            for(int i=0;i<n;i++){
                if(used.count(i) == 0){
                    int probability = pow(pheromone[last_city][i], parameters.alpha) * pow(heuristic[last_city][i], parameters.beta);
                    probabilities.push_back(probability);
                    sum_probabilities += probability;
                }
                else probabilities.push_back(0);
            }
            for(int i=0;i<n;i++){
                probabilities[i]/=sum_probabilities;
            }
            if(sum_probabilities==0) return -1;
            float random_n = (float) rand()/RAND_MAX;
            for(int i=0;i<n;i++){
                random_n -= probabilities[i];
                if(random_n<=0) return i;
            }
            return -1;
        }
        int path_length(vector<int> path){
            int length = 0;
            for(int i=0;i<path.size();i++){
                if(i==0) length += dist[path[i]][path[path.size()-1]];
                else length += dist[path[i]][path[i-1]];
            }
            return length;
        }

};


class Ant {
    public:
        int k, path_length;
        vector<int> path;
        Ant(int ant_number){
            k = ant_number;
        }
        void construct_path(Graph graph, aco_input parameters){
            int next_city = graph.choose_first_city();
            path.clear();
            set<int> used;
            while(next_city!=-1){
                path.push_back(next_city);
                used.insert(next_city);
                next_city = graph.choose_next_city(path, used, parameters);
            }
            path_length = graph.path_length(path);
        }
};


class ACO {
    public:
        Graph graph;
        int dist[max_n][max_n];
        aco_input parameters;
        Ant ants[max_n_ants];
        ACO(tsp_input input, aco_input parameters) : graph(input), parameters(parameters) {
            n_ants = this->parameters.n_ants;
            for(int ant=0; ant<n_ants; ant++){
                ants[ant] = Ant(ant);
            }
        }
        aco_output iteration(){

        }
};


int main() {
    ios_base::sync_with_stdio(0); cin.tie(0); cout.tie(0); //for faster runtime

    tsp_input input;
    input.n = 2;
    input.dist[0][0] = -1, input.dist[1][1] = -1; input.dist[0][1] = 2; input.dist[1][0] = 4; 

    aco_input p;
    p.alpha = 1; p.beta = 1; p.Q = 1; p.evaporation_rate = 1, p.n_ants = 10, p.iterations = 100;

    ACO aco = ACO(input, p);
    

    return 0;
}

//g++ -o main main.cpp Graph.cpp Ant.cpp ACO.cpp
