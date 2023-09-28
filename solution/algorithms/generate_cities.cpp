#include <bits/stdc++.h>
#include "common.h"
#include "aco.cpp"
#include "held-karp.cpp"

using namespace std;

float distance(float x1, float y1, float x2, float y2){
    return sqrt(pow(x1-x2, 2) + pow(y1-y2, 2));
}


void generate(){
    tsp_input input;
    input.n = 10;
    for(int i=0;i<input.n;i++){
        for(int j=0;j<input.n;j++){
            input.dist[i][j] = rand()%1000 + 2;
            cout<<input.dist[i][j]<<" ";
        }
        cout<<endl;
    }

    aco_input p;
    p.alpha = 2; p.beta = 5; p.Q = 1000; p.evaporation_rate = 0.8, p.n_ants = 8, p.iterations = 10;

    solve_aco(input, p);

    cout<<"Held-Karp: "<<held_karp(input)<<endl;
    cout<<endl;

}

void generate_flat(){
    tsp_input input;

    input.n = 14;
    for(int k=0;k<=30;k++){
        pair<float, float> pos[max_n];

        for(int i=0;i<input.n;i++){
            float x = rand()%100;
            float y = rand()%100;
            pos[i].first = x;
            pos[i].second = y;
        }

        for(int i=0;i<input.n;i++){
            for(int j=0;j<input.n;j++){
                input.dist[i][j] = distance(pos[i].first, pos[i].second, pos[j].first, pos[j].second);
                //cout<<input.dist[i][j]<<" ";
            }
            //cout<<endl;
        }
        aco_input p;
        p.alpha = 1; p.beta = 5; p.Q = 100; p.evaporation_rate = 0.7, p.n_ants = 10, p.iterations = 100; p.shake = true;

        solve_aco(input, p);

        cout<<"Held-Karp: "<<held_karp(input)<<endl;
        cout<<endl;
    }
}


int main(){
    generate_flat();
    return 0;
}