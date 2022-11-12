var x = document.getElementById('demo');

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, longPosition);
    } else {
        x.innerHTML = 'geolocation is not supported by this browser '
        return;
    }

}

function showPosition(position) {
    x.innerHTML = position.coords.latitude

}

function longPosition(position) {
    x.innerHTML = position.coords.longitude;

}

// console.log(latitude)
// console.log(longitude)