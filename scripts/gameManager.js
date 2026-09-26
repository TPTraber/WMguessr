// Start a round once all page elements are ready.
document.addEventListener("DOMContentLoaded", () => {
    startGame();
});

// Initialize the timer, panorama, and campus map.
function startGame() {
    startTimer();
    init();

    const map = L.map("map").setView([37.2712248, -76.7161386], 14.5);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Change the panorama after the initial scene has loaded.
    setTimeout(() => loadPanorama("resources/panoramas/pano2.jpg"), 3000);
}