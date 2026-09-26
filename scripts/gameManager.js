let score;

document.addEventListener("DOMContentLoaded", () => {
    startGame();
});

function startGame() {
    startTimer();
    init();
    var map = L.map('map').setView([37.2712248,-76.7161386], 14.5);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    setTimeout(() => {loadPanorama('resources/panoramas/pano2.jpg');}, 3000);
}