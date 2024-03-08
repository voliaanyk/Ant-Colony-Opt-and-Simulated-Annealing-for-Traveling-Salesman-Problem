
function get_coordinates(){
    coordinates = []
    var graphDiv = document.getElementById('graph-div');
    var nodes = graphDiv.querySelectorAll('.node');

    nodes.forEach(function(node) {
        id = node.id.split("-");
        coordinates.push([parseFloat(id[0]), parseFloat(id[1])]);

    });
    return coordinates
}


async function get_algorithms_output() {
    try{
        var iterationsACOInput = document.getElementById('iterations-aco-input').value;
        var antsInput = document.getElementById('ants-input').value;
        var QInput = document.getElementById('Q-input').value;
        var alphaInput = document.getElementById('alpha-input').value;
        var betaInput = document.getElementById('beta-input').value;
        var eRateInput = document.getElementById('e-rate-input').value;
        var iterationsSAInput = document.getElementById('iterations-sa-input').value;
        var tInput = document.getElementById('t-input').value;
        var edInput = document.getElementById('ed-input').value;

        if (iterationsACOInput === '' || antsInput === '' || QInput === '' ||
            alphaInput === '' || betaInput === '' || eRateInput === '' || iterationsSAInput === '' || tInput === '' || edInput === '') {
            alert('Please fill in all the input fields.');
            reject('Incomplete input fields');
            return;
        }


        function isValidFloat(value) {
            return !isNaN(parseFloat(value));
        }
        function isValidInteger(value) {
            return !isNaN(parseInt(value)) && Number.isInteger(parseFloat(value));
        }

        iterationsACOInput = parseInt(iterationsACOInput)
        iterationsACOInput = (isValidInteger(iterationsACOInput) && iterationsACOInput>0) ? iterationsACOInput : (alert('ACO iterations must be a positive integer'), reject('Wrong format'));
       
        antsInput = parseInt(antsInput)
        antsInput = (isValidInteger(antsInput) && antsInput>0) ? antsInput : (alert('Number of ants must be a positive integer'), reject('Wrong format'));
       
        QInput = parseInt(QInput)
        QInput = (isValidInteger(QInput) && QInput>0) ? QInput : (alert('Q must be a positive integer'), reject('Wrong format'));

        alphaInput = parseInt(alphaInput)
        alphaInput = (isValidInteger(alphaInput) && alphaInput>0) ? alphaInput : (alert('Alpha must be a positive integer'), reject('Wrong format'));

        betaInput = parseInt(betaInput)
        betaInput = (isValidInteger(betaInput) && betaInput>0) ? betaInput : (alert('Beta must be a positive integer'), reject('Wrong format'));
        
        eRateInput = parseFloat(eRateInput)
        eRateInput = (isValidFloat(eRateInput) && eRateInput>0 && eRateInput<1) ? eRateInput : (alert('Evaporation rate must be a number between 0 and 1'), reject('Wrong format'));
        
        iterationsSAInput = parseInt(iterationsSAInput)
        iterationsSAInput = (isValidInteger(iterationsSAInput) && iterationsSAInput>0) ? iterationsSAInput : (alert('SA iterations must be a positive integer'), reject('Wrong format'));

        tInput = parseInt(tInput)
        tInput = (isValidInteger(tInput) && tInput>0) ? tInput : (alert('T must be a positive integer'), reject('Wrong format'));

        edInput = parseFloat(edInput)
        edInput = (isValidFloat(edInput) && edInput>0 && edInput<1) ? edInput : (alert('Alpha (SA decrease rate) must be a number between 0 and 1'), reject('Wrong format'));

        var coordinates = get_coordinates();

        var requestData = {
            coordinates: coordinates,
            aco_a: alphaInput,
            aco_b: betaInput,
            aco_Q: QInput,
            aco_er: eRateInput,
            aco_ants: antsInput,
            aco_iter: iterationsACOInput,
            aco_shake: 0,
            sa_a: edInput,
            sa_T: tInput,
            sa_iter: iterationsSAInput
        };

        
        const response = await fetch('/calculate_outputs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });
    
        const data = await response.json();
        //console.log(data);
        data["coordinates"] = coordinates;
    
        return data;
    }catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


function get_custom_parameters(){
    var speed_input = document.getElementById('speed-input').value; //between 0 anqd 100
    var fast_forward = document.getElementById('fast-forward').checked; //false or true

    var hide_aco = document.getElementById('aco-hide').checked;
    var hide_sa = document.getElementById('sa-hide').checked;
    var hide_hk = document.getElementById('hk-hide').checked;

    return {
        "speed-input": speed_input,
        "fast-forward": fast_forward,
        "hide-aco": hide_aco,
        "hide-sa": hide_sa,
        "hide-hk": hide_hk
    }

}

function draw_arc(div, x1, y1, x2, y2, class_name){

    const line = document.createElement('div');
    line.classList.add(class_name);
    line.classList.add("arc");
    
    const width = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
    
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    line.style.width = `${width}px`;
    line.style.transformOrigin = '0 0';
    line.style.transform = `rotate(${angle}deg)`;
    
    div.appendChild(line);
}

function display_iteration_path(path, coordinates, class_name){

    for(let i=0; i<path.length-1; i++){
        var x1 = coordinates[i][0]; var y1 = coordinates[i][1];
        var x2 = coordinates[i+1][0]; var y2 = coordinates[i+1][1];

        graph_div = document.getElementById("graph-div");
        draw_arc(graphDiv, x1, y1, x2, y2, class_name);

    }

}
function hide_path(class_name){
    var elements = document.getElementsByClassName(class_name);
    for (var i = 0; i < elements.length; i++) {
        elements[i].remove();
    }
}


function updateValue(id, value) {
    const valueElement = document.getElementById(id);
    valueElement.textContent = value;
  }


function display_output(output, custom_parameters){

    var hk_output = JSON.stringify(output["hk_output"]);
    var aco_output = output["aco_output"];
    var sa_output = output["sa_output"];

    var coordinates = output["coordinates"];

    if (hk_output == -1) custom_parameters["hide-hk"] = true;

    if(!custom_parameters["hide-hk"]){
        display_iteration_path(hk_output["path"], coordinates, "sa-path");
        updateValue("hk-value", Math.round(parseFloat(hk_output["cost"])));
    }


    var max_iteration = Math.max(aco_output.length, sa_output.length);
    var aco_best = -1;
    var sa_best = -1;

    for (let i=0;i<max_iteration;i++){

        updateValue("iteration-number", i+1);

        if(i<aco_output.length && custom_parameters["hide-aco"] == false) {
            var aco_iteration = JSON.stringify(aco_output[i]);

            if (aco_best == -1 || parseFloat(aco_iteration.cost) <aco_best){
                aco_best = parseFloat(aco_iteration.cost);
                display_iteration_path(aco_iteration.best_route, coordinates, "aco-path");
                updateValue("aco-value", Math.round(aco_best));
                updateValue("aco-found", i+1);

            }
        }

        if(i<sa_output.length && custom_parameters["hide-sa"] == false) {
            var sa_iteration = JSON.stringify(sa_output[i]);

            if (sa_best == -1 || parseFloat(sa_iteration.cost) <sa_best){
                sa_best = parseFloat(sa_iteration.cost);
                display_iteration_path(sa_iteration.path, coordinates, "sa-path");
                updateValue("sa-value", Math.round(sa_best));
                updateValue("sa-found", i+1);

            }
        }
        
    }

}



document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.btn-start').addEventListener('click', async function() {
        var output = await get_algorithms_output();
        var custom_parameters = get_custom_parameters();
        console.log(output);
        console.log(custom_parameters);

        display_output(output, custom_parameters);
    });
});
