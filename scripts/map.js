var guessMode = true;
var guessCoords = L.latLng();

map = L.map('map').setView([37.2712248, -76.7161386], 14.5);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker();

function onMapClick(e) {
    if (guessMode) {
        guessCoords = e.latlng;
        marker
            .setLatLng(guessCoords).addTo(map);
    }
}

map.on('click', onMapClick);

function getGuessCoords() {
    return guessCoords;
}

var answer = L.marker();

function showAnswerMap(coords) {
    answer
        .setLatLng(coords).addTo(map);
        if(typeof guessCoords !== "undefined"){
            var polyline = L.polyline([coords, guessCoords], { color: 'red' }).addTo(map);
            var bounds = L.latLngBounds(coords, guessCoords).pad(0.2);
            map.fitBounds(bounds);
        }
        else{
            map.flyTo(answer.getLatLng());
        }
    
}

function resetMap() {
    map.eachLayer(function (layer) {
        // Check if the layer is a marker (but not the base tile layer)
        if (layer instanceof L.Marker || layer instanceof L.Path) {
            map.removeLayer(layer);
        }
    });
    guessCoords = L.latLng();
    unlockMap();
    map.setView([37.2712248, -76.7161386], 14.5);
    guessMode = true;
}

function setGuessMode(mode) {
    guessMode = mode;
}

const resizeObserver = new ResizeObserver(() => {
    map.invalidateSize();
});

const mapDiv = document.getElementById('map');
resizeObserver.observe(mapDiv);

function lockMap() {
    map.dragging.disable();
    map.scrollWheelZoom.disable();
    map.doubleClickZoom.disable();
    map.touchZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
    guessMode = false;
    mapDiv.style.width = "calc(var(--mapWidth) * 2)";
    mapDiv.style.height = "calc(var(--mapHeight) * 2)";
    document.getElementById('map').style.cursor = 'default';
}

function unlockMap(){
    map.dragging.enable();
    map.scrollWheelZoom.enable();
    map.doubleClickZoom.enable();
    map.touchZoom.enable();
    map.boxZoom.enable();
    map.keyboard.enable();
    guessMode = true;
    mapDiv.style.removeProperty("width");
    mapDiv.style.removeProperty("height");
    //TODO: What is other cursor styles?
    document.getElementById('map').style.cursor = 'default';
}

function hideMap(){
    mapDiv.classList.add('hide');
    lockMap();
}