#include <bits/stdc++.h>
using namespace std;

//#include "common.h"
//#include "held-karp.cpp"

class Graph{
    public:
        int n;
        float dist[max_n][max_n], heuristic[max_n][max_n], pheromone[max_n][max_n];
        float update[max_n][max_n];
        Graph(tsp_input input) {
            n = input.n;
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    if (i == j) input.dist[i][j] = inf;
                    dist[i][j] = input.dist[i][j];
                    heuristic[i][j] = dist[i][j];
                    pheromone[i][j] = 1;
                    if (i == j) pheromone[i][j] = 0;
                }
            }
        }

        int choose_first_city(){
            return random()%n;
        }
        int choose_next_city(vector<int> route, set<int> used, aco_input parameters){
            int l = route.size();
            int last_city = route[l-1];
            vector<float> probabilities;
            float sum_probabilities = 0;
            for(int i=0;i<n;i++){
                if(used.count(i) == 0){
                    //cout<<pheromone[last_city][i]<<" "<<heuristic[last_city][i]<<endl;
                    int probability = (1-used.count(i))*pow(pheromone[last_city][i], parameters.alpha) * pow(heuristic[last_city][i], parameters.beta);
                    probabilities.push_back(probability);
                    //cout<<probability<<endl;
                    sum_probabilities += probability;
                }
                else probabilities.push_back(0);
            }
            for(int i=0;i<n;i++){
                probabilities[i] = probabilities[i] * 1.0 / sum_probabilities;
            }
            if(sum_probabilities==0) return -1;
            float random_n = (float) rand()/RAND_MAX;
            //cout<<random_n<<endl;
            for(int i=0;i<n;i++){
                random_n -= probabilities[i];
                //cout<<i<<" "<<random_n<<" "<<probabilities[i]<<endl;
                if(random_n<=0) return i;
            }
            return -1;
        }
        int path_length(vector<int> path){
            int length = 0;
            for(int i=1;i<path.size();i++){
                length += dist[path[i-1]][path[i]];
            }
            return length;
        }
        void update_pheromone_levels(aco_input parameters){
            for(int i=0; i<n; i++){
                for(int j=0; j<n; j++){
                    pheromone[i][j] = (1-parameters.evaporation_rate)*pheromone[i][j];
                    pheromone[i][j] += update[i][j];
                }
            }
        }
        void clear_update(){
            for(int i=0; i<n; i++){
                for(int j=0; j<n; j++){
                    update[i][j] = 0;
                }
            }
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
            path.push_back(path[0]);
            path_length = graph.path_length(path);
        }
};


class ACO {
    public:
        Graph graph;
        float dist[max_n][max_n];
        aco_input parameters;
        vector<Ant> ants;
        float update[max_n][max_n];

        ACO(tsp_input input, aco_input parameters) : graph(input), parameters(parameters) {
            int n_ants = parameters.n_ants;
            for(int ant=0; ant<n_ants; ant++){
                ants.push_back(Ant(ant));
            }
        }
        void construct_paths(){
            for(int i=0; i<ants.size(); i++){
                ants[i].construct_path(graph, parameters);
            }
        }
        void compare_edges(){
            graph.clear_update();
            for(int k=0; k<ants.size(); k++){
                auto ant = ants[k];
                for(int i=1; i<ant.path.size(); i++){
                    graph.update[ant.path[i-1]][ant.path[i]] += parameters.Q / ant.path_length;
                }
            }
        }
        aco_output iteration(){
            construct_paths();
            compare_edges();
            graph.update_pheromone_levels(parameters);


            aco_output output;
            float best_length = inf;
            vector<int> best_route;

            for(int k=0; k<ants.size(); k++){
                auto ant = ants[k];
                if(ant.path_length < best_length){
                    best_length = ant.path_length;
                    best_route = ant.path;
                }
                for(int i=0; i<ant.path.size(); i++){
                    output.ant_route[k].push_back(ant.path[i]);
                }
            }
            for(int i=0; i<graph.n; i++){
                for(int j=0; j<graph.n; j++){
                    output.pheromone[i][j] = graph.pheromone[i][j];
                }
            }
            output.best_route = best_route;
            output.length = best_length;
            output.n = graph.n;
            output.n_ants = parameters.n_ants;
            return output;

        }   
};

void print_aco_output(aco_output output){
    cout<<"Best length: "<<output.length<<endl;
    cout<<"Best route: ";
    for(int i=0;i<output.best_route.size();i++) cout<<output.best_route[i]<<" ";
    cout<<endl;
    /*
    cout<<"Pheromones:"<<endl;
    for(int i=0;i<output.n;i++){
        for(int j=0;j<output.n;j++){
            cout<<output.pheromone[i][j]<<" ";
        }
        cout<<endl;
    }
    for(int i=0;i<output.n_ants;i++){
        cout<<"Ant "<<i<<endl;
        for(int j=0;j<output.ant_route[i].size();j++){
            cout<<output.ant_route[i][j]<<" ";
        }
        cout<<endl;
    }*/
}


void solve_aco(tsp_input input, aco_input p) {
    ios_base::sync_with_stdio(0); cin.tie(0); cout.tie(0); //for faster runtime

    vector<float> best_routes;
    ACO aco = ACO(input, p);
    float best = inf;
    int found = 0;
    vector<int> best_route;
    for(int i=1;i<=p.iterations;i++){
        aco_output out = aco.iteration();
        best_routes.push_back(out.length);
        if(out.length<best){
            best = out.length;
            found = i;
            best_route = out.best_route;
        }
        //print_aco_output(out);
    }

    for(int i=0;i<input.n;i++){
        cout<<best_route[i]<<" ";
    }
    cout<<endl;

    cout<<"ACO best: "<<best<<" found:"<<found<<endl;
    
}

//g++ -o main main.cpp Graph.cpp Ant.cpp ACO.cpp
