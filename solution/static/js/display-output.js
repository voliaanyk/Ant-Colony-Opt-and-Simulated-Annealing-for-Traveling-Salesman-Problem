
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


function get_algorithms_output() {
    return new Promise((resolve, reject) => {
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
        antsInput = (isValidInteger(antsInput && antsInput>0)) ? antsInput : (alert('Number of ants must be a positive integer'), reject('Wrong format'));
       
        QInput = parseInt(QInput)
        QInput = (isValidInteger(QInput) && QInput>0) ? QInput : (alert('Q must be a positive integer'), reject('Wrong format'));

        alphaInput = parseInt(alphaInput)
        alphaInput = (isValidInteger(alphaInput) && alphaInput>0) ? alphaInput : (alert('Alpha must be a positive integer'), reject('Wrong format'));

        betaInput = parseInt(betaInput)
        betaInput = (isValidInteger(betaInput) && betaInput>0) ? betaInput : (alert('Beta must be a positive integer'), reject('Wrong format'));
        
        eRateInput = parseFloat(eRateInput)
        eRateInput = (isValidFloat(eRateInput) && eRateInput>0 && eRateInput<1) ? eRateInput : (alert('Evaporation rate must be a number between 0 and 1'), reject('Wrong format'));
        
        iterationsSAInput = parseInt(beiterationsSAInputtaInput)
        iterationsSAInput = (isValidInteger(iterationsSAInput) && iterationsSAInput>0) ? iterationsSAInput : (alert('SA iterations must be a positive integer'), reject('Wrong format'));

        tInput = parseInt(tInput)
        tInput = (isValidInteger(tInput) && tInput>0) ? tInput : (alert('T must be a positive integer'), reject('Wrong format'));

        edInput = parseFloat(edInput)
        edInput = (isValidFloat(edInput) && edInput>0 && edInput<1) ? edInput : (alert('Alpha (SA decrease rate) must be a number between 0 and 1'), reject('Wrong format'));

        var requestData = {
            coordinates: get_coordinates(),
            aco_a: parseFloat(alphaInput),
            aco_b: parseFloat(betaInput),
            aco_Q: parseFloat(QInput),
            aco_er: parseFloat(eRateInput),
            aco_ants: parseFloat(antsInput),
            aco_iter: parseFloat(iterationsACOInput),
            aco_shake: 0,
            sa_a: parseFloat(edInput),
            sa_T: parseFloat(tInput),
            sa_iter: parseFloat(iterationsSAInput)
        };

        fetch('/calculate_outputs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            resolve(data);
        })
        .catch(error => {
            console.error('Error:', error);
            reject(error);
        });
    });
}



document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.btn-start').addEventListener('click', function() {
        output = get_algorithms_output()
        console.log(output)
    });
});
