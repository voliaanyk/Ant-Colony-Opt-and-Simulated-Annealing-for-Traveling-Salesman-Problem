let coordinates = [];

function close_to(x, y){
    let n = coordinates.length;
    for(let i=0;i<n;i++){
        let c_x = coordinates[i][0];
        let c_y = coordinates[i][1];


        if(Math.abs(c_x - x) <= 10 && Math.abs(c_y-y) <= 10){
            ////console.log("found in the array "+ c_x + " "+c_y);
            coordinates.splice(i, 1);
            return [c_x, c_y];
        }
    }
    return [-1,-1];
}

function clear_graph(graph_div){
    while(graph_div.firstChild){
        graph_div.removeChild(graph_div.firstChild);
    }
    coordinates.splice(0, coordinates.length);
}

function get_node_width(graph_div){
    const node = document.createElement('div');
    node.classList.add('node');
    graph_div.appendChild(node);
    const nodeStyle = window.getComputedStyle(node);
    const nodeWidth = parseFloat(nodeStyle.width);
    graph_div.removeChild(node);

    return nodeWidth;
}

function isWithinGraphDiv(graph_div, x, y){
    
    nodeWidth = get_node_width(graph_div);

    const containerRect = graph_div.getBoundingClientRect();
    const isWithinContainer = (
        x >= containerRect.left + nodeWidth &&
        x <= containerRect.right - nodeWidth &&
        y >= containerRect.top + nodeWidth &&
        y <= containerRect.bottom - nodeWidth
    );
    return isWithinContainer;
}

function add_node(graph_div, x, y){

    if(!isWithinGraphDiv(graph_div, x, y)) return false;

    const node = document.createElement('div');
    node.classList.add('node');
    node.id = x + "-" + y;
    
    graph_div.appendChild(node);

    const nodeStyle = window.getComputedStyle(node);
    const nodeWidth = parseFloat(nodeStyle.width);

    node.style.left = x - nodeWidth/2 +'px';
    node.style.top = y - nodeWidth/2 +'px';

    coordinates.push([x, y]);

    return true;
}

function generate_cities(div, n){
    clear_graph(div);

    nodeWidth = get_node_width(div);

    const containerRect = div.getBoundingClientRect();
    const left = containerRect.left + nodeWidth;
    const right = containerRect.right - nodeWidth;
    const top = containerRect.top + nodeWidth;
    const bottom = containerRect.bottom - nodeWidth;

    
    generated = 0;
    while (generated<n){
        let x = Math.floor(Math.random() * (right - left + 1)) + left;
        let y = Math.floor(Math.random() * (top - bottom + 1)) + bottom;

        if(add_node(div, x, y)) generated++;

    }
}


document.addEventListener('DOMContentLoaded', function(){
    //ACCESS graph_locked variable here
    console.log(last_aco_path);

    const graph_div = document.getElementById("graph-div");
    let selected_node = null;
    let created_node = 0;

    graph_div.addEventListener('mousedown', function(event){
        
        //console.log("mousedown")
        const x = event.clientX;
        const y = event.clientY;

        const right_click = (event.button == 2) || (event.ctrlKey);

        if(isWithinGraphDiv(graph_div, x, y)){

            if(graph_locked){
                alert("clear the paths to edit the graph");
                return;
            }

            let close_to_coordinate = close_to(x, y);
            if (close_to_coordinate[0]!=-1){
                let id = close_to_coordinate[0]+"-"+close_to_coordinate[1];
                selected_node = document.getElementById(id);
                selected_node.style.cursor = 'grabbing';

                if(right_click){
                    event.preventDefault();
                    graph_div.removeChild(selected_node);
                }

            }
            else if (!right_click) created_node = 1;
            
        }
    })

    graph_div.addEventListener('mousemove', function(event){
        const x = event.clientX;
        const y = event.clientY;

        if(isWithinGraphDiv(graph_div, x, y) && selected_node){

            if(graph_locked){
                alert("clear the paths to edit the graph");
                return;
            }

            selected_node.style.left = x+'px';
            selected_node.style.top = y+'px';
            selected_node.id = x+"-"+y;
        }
    })

    graph_div.addEventListener('mouseup', function(event){

        if (selected_node){

            if(graph_locked){
                alert("clear the paths to edit the graph");
                return;
            }

            const x = selected_node.id.split("-")[0];
            const y = selected_node.id.split("-")[1];
            coordinates.push([x, y]);
            selected_node.style.cursor = 'grab';
        }
        else if (created_node){
            created_node = 0;
            const x = event.clientX;
            const y = event.clientY;

            if(isWithinGraphDiv(graph_div, x, y)){
                add_node(graph_div, x, y);
            }
        }
        selected_node = null;


    })

    graph_div.addEventListener("contextmenu", function (event) {
        event.preventDefault();
    });

    const button_clear = document.getElementById("btn-clear");
    button_clear.addEventListener("click", function(){

        if(graph_locked){
            alert("clear the paths to edit the graph");
            return;
        }

        clear_graph(graph_div);
    })

    const button_generate = document.getElementById("btn-generate");
    const no_cities_inp = document.getElementById("cities-input");

    button_generate.addEventListener("click", function () {

        if(graph_locked){
            alert("clear the paths to edit the graph");
            return;
        }

        const numberOfCities = parseInt(no_cities_inp.value);
        if (!isNaN(numberOfCities) && Number.isInteger(numberOfCities) && numberOfCities > 0) {
            generate_cities(graph_div, numberOfCities);
        } else {
            alert("Please enter a valid positive integer for the number of cities.");
        }
    });

})