function showInfoPopup() {
    document.getElementById('info-popup').style.display = 'block';
}

function closeInfoPopup() {
    document.getElementById('info-popup').style.display = 'none';
}

function redirectToMainPage() {
    window.location.href = '/';
}

function setBackgroundImageColor() {
    var image = new Image();
    // Use an absolute path to the image, as it's within the static folder
    image.src = "../images/start_page_image.png";
    
    image.onload = function() {
        var canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;

        var context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, 1, 1);

        var color = context.getImageData(0, 0, 1, 1).data;
        var rgbColor = 'rgb(' + color[0] + ', ' + color[1] + ', ' + color[2] + ')';

        $('body').css('background-color', rgbColor);
    };
}
