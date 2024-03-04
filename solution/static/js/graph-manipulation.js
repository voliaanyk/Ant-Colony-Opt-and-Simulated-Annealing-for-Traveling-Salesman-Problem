let coordinates = []


document.addEventListener('DOMContentLoaded', function(){

    const graph_div = document.getElementById("graph-div")

    document.addEventListener('click', function(event){
        const x = event.clientX;
        const y = event.clientY;

        const containerRect = graph_div.getBoundingClientRect();
        const isWithinContainer = (
            x >= containerRect.left + 5 &&
            x <= containerRect.right - 5 &&
            y >= containerRect.top + 5 &&
            y <= containerRect.bottom - 5
        );

        if(isWithinContainer){
            const node = document.createElement('div');
            node.classList.add('node');

            node.style.left = x+'px';
            node.style.top = y+'px';

            graph_div.appendChild(node);
        }
    })

})