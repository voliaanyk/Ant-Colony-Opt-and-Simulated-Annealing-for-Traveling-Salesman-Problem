from flask import Flask, render_template, jsonify, request
import json

import sys
sys.path.append("algorithms")  

from algorithms.common import *
from algorithms.aco import *
from algorithms.sa import *
from algorithms.held_karp import *

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('start.html')

@app.route('/main')
def main():
    return render_template('main.html')

@app.route('/calculate_outputs', methods=['POST'])
def calculate_outputs_api():
    data = request.get_json()
    coordinates = data['coordinates']
    aco_a = data['aco_a']
    aco_b = data['aco_b']
    aco_Q = data['aco_Q']
    aco_er = data['aco_er']
    aco_ants = data['aco_ants']
    aco_iter = data['aco_iter']
    aco_shake = data['aco_shake']
    sa_a = data['sa_a']
    sa_T = data['sa_T']
    sa_iter = data['sa_iter']

    n, dist = calculate_distance_matrix(coordinates)
    tsp_input = TSP_input(n, dist, coordinates)
    aco_input = ACO_parameters(aco_a, aco_b, aco_Q, aco_er, aco_ants, aco_iter, aco_shake)
    sa_input = SA_parameters(sa_a, sa_T, sa_iter)

    hk_output = held_karp(tsp_input)
    aco_output = solve_aco(tsp_input, aco_input)
    sa_output = solve_sa(tsp_input, sa_input)

    for i in range(len(aco_output)):
        aco_output[i] = json.dumps(aco_output[i].__dict__)

    for i in range(len(sa_output)):
        sa_output[i] = json.dumps(sa_output[i].__dict__)

    return jsonify({
        'hk_output': hk_output,
        'aco_output': aco_output,
        'sa_output': sa_output
    })

if __name__ == '__main__':
    app.run(debug=True)