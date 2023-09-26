#include <bits/stdc++.h>
#include "common.h"
using namespace std;


class ACO {
    public:
        int n;
        int dist[max_n][max_n];
        int alpha, beta, Q, evaporation_rate, n_ants, iterations;
        ACO(tsp_input input, aco_input parameters){
            n = input.n;
            //copy to dist
            alpha = parameters.alpha; beta = parameters.beta; Q = parameters.Q; evaporation_rate = parameters.evaporation_rate; n_ants = parameters.n_ants; iterations = parameters.iterations;

        }
};

int main() {
    ios_base::sync_with_stdio(0); cin.tie(0); cout.tie(0); //for faster runtime

    tsp_input input;
    input.n = 2; input.dist = [[1, 4], [5, 3]];

    aco_input p;
    p.alpha = 1; p.beta = 1; p.Q = 1; p.evaporation_rate = 1, p.n_ants = 10, p.iterations = 100;

    ACO aco = ACO(input, p);
    

    return 0;
}
