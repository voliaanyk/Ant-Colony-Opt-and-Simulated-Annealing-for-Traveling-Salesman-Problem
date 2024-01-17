// scripts.js
let slider = document.getElementById("myRange");
let output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
    output.innerHTML = this.value;
}

document.querySelector('.start').addEventListener('click', () => {
    alert('Travel Route Optimisation Started');
});