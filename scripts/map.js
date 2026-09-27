var guessMode = true;
var guessCoords = L.latLng();

map = L.map('map').setView([37.2712248, -76.7161386], 14.5);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker();

function onMapClick(e) {
    if (guessMode){
        guessCoords = e.latlng;
        marker
            .setLatLng(guessCoords).addTo(map);
    }
}

map.on('click', onMapClick);

function getGuessCoords() {
    var coords = -1;
    if (typeof marker !== 'undefined'){
        coords = marker.getLatLng();
    }
    console.log(coords);
    return coords;
}

var answer = L.marker();

function showAnswerMap(coords){
    answer
        .setLatLng(coords).addTo(map);
        var polyline = L.polyline([coords, guessCoords], {color: 'red'}).addTo(map);
    var bounds = L.latLngBounds(coords, guessCoords).pad(0.2);
    map.fitBounds(bounds);
}

function resetMap(){
    map.eachLayer(function (layer) {
        // Check if the layer is a marker (but not the base tile layer)
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });
    map.setView([37.2712248, -76.7161386], 14.5);
    guessMode = true;
}

function setGuessMode(mode){
    guessMode = mode;
}

const resizeObserver = new ResizeObserver(() => {
  map.invalidateSize();
});

const mapDiv = document.getElementById('map');
resizeObserver.observe(mapDiv);