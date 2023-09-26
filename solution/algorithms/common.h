#define inf 1000000
#define max_n 100

using namespace std;



struct tsp_input{
    int n, dist[max_n][max_n]; //number of citites, adjacency matrix
};

struct tsp_output{
    int min_dist; //length of the shortest tsp path
    vector<int> shortest_path; //list of citites in the shortest paths
};

struct aco_input{
    int alpha, beta, Q, evaporation_rate, n_ants, iterations;
};

int binary_pow(int n, int p){ //faster way to raise a number to a power
    if(p==0) return 1;
    int x = binary_pow(n, p/2);
    if(p%2==0) return x*x;
    return x*x*n;
}