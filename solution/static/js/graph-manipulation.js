let coordinates = []


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


document.addEventListener('DOMContentLoaded', function(){

    const graph_div = document.getElementById("graph-div");
    let selected_node = null;

    graph_div.addEventListener('mousedown', function(event){
        //console.log("mousedown")
        const x = event.clientX;
        const y = event.clientY;

        const containerRect = graph_div.getBoundingClientRect();
        const isWithinContainer = (
            x >= containerRect.left + 10 &&
            x <= containerRect.right - 10 &&
            y >= containerRect.top + 10 &&
            y <= containerRect.bottom - 10
        );

        if(isWithinContainer){

            let close_to_coordinate = close_to(x, y);
            if (close_to_coordinate[0]!=-1){
                let id = close_to_coordinate[0]+"-"+close_to_coordinate[1];
                //console.log(id);
                selected_node = document.getElementById(id);
                //console.log(selected_node)
            }
            else{
                const node = document.createElement('div');
                node.classList.add('node');
                node.id = x + "-" + y;
                //console.log("created "+ node.id);
                //console.log("added to array " + x + " " + y);

                node.style.left = x+'px';
                node.style.top = y+'px';

                selected_node = node;

                graph_div.appendChild(node);
            }
            selected_node.style.cursor = 'grabbing';
        }
    })

    graph_div.addEventListener('mousemove', function(event){
        const x = event.clientX;
        const y = event.clientY;

        const containerRect = graph_div.getBoundingClientRect();
        const isWithinContainer = (
            x >= containerRect.left + 10 &&
            x <= containerRect.right - 10 &&
            y >= containerRect.top + 10 &&
            y <= containerRect.bottom - 10
        );

        if(isWithinContainer && selected_node){

            selected_node.style.left = x+'px';
            selected_node.style.top = y+'px';
            selected_node.id = x+"-"+y;
        }
    })

    graph_div.addEventListener('mouseup', function(event){

        if (selected_node){
            const x = selected_node.id.split("-")[0];
            const y = selected_node.id.split("-")[1];
            coordinates.push([x, y]);
            selected_node.style.cursor = 'grab';
        }
        selected_node = null;


    })

})