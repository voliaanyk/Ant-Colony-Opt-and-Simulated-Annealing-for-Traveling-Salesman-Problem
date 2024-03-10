//initialise the variables
//last_xx_path is for when path is hiden by userm it can be displayed again
var last_aco_path = null;
var last_sa_path = null;
var last_hk_path = null;

var visualisation_on = false; //visualisation is on when iterations are shown
var iteration = -1; //number of iteration that is displayed
var graph_locked = false; //graph is locked when any paths are shown on the display

//function to get algorithms output
async function get_algorithms_output() {
    try{
        //get values of all inputs
        var iterationsACOInput = document.getElementById('iterations-aco-input').value;
        var antsInput = document.getElementById('ants-input').value;
        var QInput = document.getElementById('Q-input').value;
        var alphaInput = document.getElementById('alpha-input').value;
        var betaInput = document.getElementById('beta-input').value;
        var eRateInput = document.getElementById('e-rate-input').value;
        var iterationsSAInput = document.getElementById('iterations-sa-input').value;
        var tInput = document.getElementById('t-input').value;
        var edInput = document.getElementById('ed-input').value;

        //check if any are empty
        if (iterationsACOInput === '' || antsInput === '' || QInput === '' ||
            alphaInput === '' || betaInput === '' || eRateInput === '' || iterationsSAInput === '' || tInput === '' || edInput === '') {
            alert('Please fill in all the input fields.');
            reject('Incomplete input fields');
            return;
        }

        //check types of inputs
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
        console.log(coordinates);
        //create request data
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
        //get the response 
        //await is to not continue executing code until we get the response
        const response = await fetch('/calculate_outputs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });
        //get response to json format
        const data = await response.json();
        //console.log(data);
        return data;
    }catch (error) { //if there was an error while executing, output and throw
        console.error('Error:', error);
        throw error;
    }
}

//function that returns values of custom parameters regarding to visualisation
function get_custom_parameters(){
    var speed_input = document.getElementById('speed-input').value; //between 0 anqd 100
    var fast_forward = document.getElementById('fast-forward').checked; //false or true
    var hide_aco = document.getElementById('aco-hide').checked;
    var hide_sa = document.getElementById('sa-hide').checked;
    var hide_hk = document.getElementById('hk-hide').checked;
    //return a dictionary with all input values 
    return {
        "speed-input": speed_input,
        "fast-forward": fast_forward,
        "hide-aco": hide_aco,
        "hide-sa": hide_sa,
        "hide-hk": hide_hk
    }
}

//function that creates an arc in visualisation
function draw_arc(div, x1, y1, x2, y2, class_name){
    //create a line (div) with class arc and another class_name
    const line = document.createElement('div');
    line.classList.add(class_name);
    line.classList.add("arc");

    //d is a parameter - number of pixels line is shifted to the right
    //it's o for hk, 2 for aco, and -2 for sa (so that lines don't overlap and all can be seen)
    var d = 0;
    if(class_name=="aco-path") d = 2;
    if(class_name=="sa-path") d = -2;
    
    //calculate width(length) and angle to the horizontal using coordinates of start and end
    const width = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

    //shifting d pixels to the right
    x1 = x1 - d * Math.sin(angle * (Math.PI / 180));
    y1 = y1 + d * Math.cos(angle * (Math.PI / 180));
    
    //add all these values to arc's style
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    line.style.width = `${width}px`;
    line.style.transformOrigin = '0 0';
    line.style.transform = `rotate(${angle}deg)`;
    //and add the arc to graph container so that it's shown on the display
    div.appendChild(line);
}

//function that displays a path
function display_iteration_path(path, coordinates, class_name){
    //hide the path for this particular output type first
    hide_path(class_name);
    //iterate through nodes in the path
    for(let i=0; i<path.length-1; i++){
        //get coordinates of 2 neighbouring nodes 
        var x1 = coordinates[path[i]][0]; var y1 = coordinates[path[i]][1];
        var x2 = coordinates[path[i+1]][0]; var y2 = coordinates[path[i+1]][1];
        //draw an arc in graph container
        graph_div = document.getElementById("graph-div");
        draw_arc(graph_div, x1, y1, x2, y2, class_name);
    }
}

//function that hides a path of a particular class
function hide_path(class_name){
    //get all elements with the class
    var elements = document.getElementsByClassName(class_name);
    for (var i = elements.length-1; i>=0; i--) {
        elements[i].remove();//remove them one by one
    }
}

//function that updates a value in a certain text box
function updateValue(id, value) {
    const valueElement = document.getElementById(id);
    valueElement.textContent = value;
}

//function that shows/hides paths outputs depending on the state of "hide" check
function update_hide_paths(){
    custom_parameters = get_custom_parameters();

    if(custom_parameters["hide-aco"] == false && last_aco_path != null) display_iteration_path(last_aco_path, coordinates, "aco-path");
    if(custom_parameters["hide-aco"] == true) hide_path("aco-path");

    if(custom_parameters["hide-sa"] == false && last_sa_path != null) display_iteration_path(last_sa_path, coordinates, "sa-path");
    if(custom_parameters["hide-sa"] == true) hide_path("sa-path");

    if(custom_parameters["hide-hk"] == false && last_hk_path != null) display_iteration_path(last_hk_path, coordinates, "hk-path");
    if(custom_parameters["hide-hk"] == true) hide_path("hk-path");
}

//function that clears all text outputs
function clear_outputs(){
    updateValue("iteration-number", 0);
    updateValue("aco-value", 0);
    updateValue("aco-found", 0);
    updateValue("sa-value", 0);
    updateValue("sa-found", 0);
    updateValue("hk-value", 0);
}

//function that displays output from algorithms
function display_output(output, custom_parameters){
    //create variables for each output
    var hk_output = JSON.parse(output["hk_output"]);
    var aco_output = output["aco_output"];
    var sa_output = output["sa_output"];

    //calculate the number of iterations that wee need to show
    var max_iteration = Math.max(aco_output.length, sa_output.length);
    //set aco and sa best to -1 (best cost of path)
    var aco_best = -1;
    var aco_found = -1;
    var sa_best = -1;
    var sa_found = -1;


    //we do not iterate through held-karp, so we can display it's output straight away
    last_hk_path = hk_output["path"]; //set last held-karp path to the held-karp path (there is only one path)
    updateValue("hk-value", Math.round(parseFloat(hk_output["cost"]))); //update value of the cost
    if(!custom_parameters["hide-hk"]){ //if hide isn't checked, display the path
        display_iteration_path(hk_output["path"], coordinates, "hk-path");
    }

    function display_iteration(){
        //if visualisation isn't on, return
        if(!visualisation_on) return;
        //get custom parameters
        custom_parameters = get_custom_parameters();

        var speed = custom_parameters["speed-input"]; //1 to 100
        var fast_forward = custom_parameters["fast-forward"]; //true if display with maximum speed
        var update_display = true;
        if(fast_forward) update_display = false; //if fast forward, we don't update display, only take record of best costs and paths

        var i = iteration;
        iteration ++; //increase iteration

        if(update_display) updateValue("iteration-number", i+1); //update the number of iteration

        if(i<aco_output.length) { //if current iteration is less or equal to the maximum aco iteration
            var aco_iteration = JSON.parse(aco_output[i]); //get a dictionary of aco iteration
            if (aco_best == -1 || parseFloat(aco_iteration.cost) <aco_best){ //if current iteration is better than the best
                aco_best = parseFloat(aco_iteration.cost); //set best cost to current cost
                aco_found = i+1;
                last_aco_path = aco_iteration.best_route; //update last aco path / best aco path
                if(update_display){ //if update_display is true, update the costs and path on the display
                    if(custom_parameters["hide-aco"]==false) display_iteration_path(aco_iteration.best_route, coordinates, "aco-path");
                    updateValue("aco-value", Math.round(aco_best));
                    updateValue("aco-found", i+1);
                }
            }
        }
        if(i<sa_output.length) {//if current iteration is less or equal to the maximum sa iteration
            var sa_iteration = JSON.parse(sa_output[i]);//get a dictionary of sa iteration
            if (sa_best == -1 || parseFloat(sa_iteration.cost) <sa_best){ //if current iteration is better than the best
                sa_best = parseFloat(sa_iteration.cost); //set best cost to current cost
                sa_found = i+1;
                last_sa_path = sa_iteration.path; //update last sa path / best sa path
                if(update_display){//if update_display is true, update the costs and path on the display
                    if(custom_parameters["hide-sa"]==false) display_iteration_path(sa_iteration.path, coordinates, "sa-path");
                    updateValue("sa-value", Math.round(sa_best));
                    updateValue("sa-found", i+1);
                }
            }
        }
        if(iteration >= max_iteration){ //if iteration is the last possible iteration, we need to stop

            if(fast_forward){ //if fast_forward, we didn't display any of the paths and costs during the loop, so we need to update those
                if(custom_parameters["hide-aco"]==false) display_iteration_path(last_aco_path, coordinates, "aco-path");
                updateValue("aco-value", Math.round(aco_best));
                updateValue("aco-found", aco_found);
                if(custom_parameters["hide-sa"]==false) display_iteration_path(last_sa_path, coordinates, "sa-path");
                updateValue("sa-value", Math.round(sa_best));
                updateValue("sa-found", sa_found);
                updateValue("iteration-number", i+1);
            }
            visualisation_on = false; //reset visualisation_on to false
            iteration = -1; //reset iteration to -1
            return;
        }
        //execute next iteration with a time delay, that is calculated using the speed input
        var delay = fast_forward?0:(100 - speed) * 10;
        setTimeout(function () {
            display_iteration();
        }, delay);
        
    }
    //display the first iteration
    display_iteration();

}



//event listener for any of users mouse moves/clicks, etc
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.btn-start').addEventListener('click', async function() {
        if(visualisation_on){
            alert("visualisation is already on");
            return;
        }

        var output = await get_algorithms_output();
        var custom_parameters = get_custom_parameters();
        console.log(output);
        console.log(custom_parameters);

        visualisation_on = true;
        graph_locked = true;
        if (iteration == -1) iteration = 0;
        display_output(output, custom_parameters);
    });
    document.querySelector('.btn-stop').addEventListener('click', function() {
        if(!visualisation_on){
            alert("visualisation is not on");
            return;
        }
        visualisation_on = false;
        iteration -= 1;
    });
    document.querySelector('.btn-clear-paths').addEventListener('click', function() {
        visualisation_on = false;
        iteration = -1;
        last_aco_path = null;
        last_sa_path = null;
        last_hk_path = null;
        graph_locked = false;
        hide_path('arc');
        clear_outputs();
    });
    document.getElementById("aco-hide").addEventListener('change', function(){
        update_hide_paths();
    })
    document.getElementById("sa-hide").addEventListener('change', function(){
        update_hide_paths();
    })
    document.getElementById("hk-hide").addEventListener('change', function(){
        update_hide_paths();
    })
});
