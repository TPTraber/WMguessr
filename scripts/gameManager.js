var pictureCoords;


// Start a round once all page elements are ready.
document.addEventListener("DOMContentLoaded", () => {
    startGame();
});

// Keep one shared pool so each panorama can be selected only once.
const availablePanos = [
    "resources/panoramas/IMG_20260926_162343_00_merged.jpg",
    "resources/panoramas/IMG_20260926_163145_00_383.jpg",
    "resources/panoramas/IMG_20260926_163251_00_384.jpg",
    "resources/panoramas/IMG_20260926_163318_00_385.jpg",
    "resources/panoramas/IMG_20260926_163720_00_merged.jpg",
    "resources/panoramas/IMG_20260926_163926_00_merged.jpg",
    "resources/panoramas/IMG_20260926_164403_00_merged.jpg",
    "resources/panoramas/IMG_20260926_164939_00_merged.jpg",
    "resources/panoramas/IMG_20260926_165319_00_merged.jpg",
    "resources/panoramas/IMG_20260926_170401_00_merged.jpg"
];

// Initialize the timer, panorama, and campus map.
function startGame() {
    startTimer();
    init();
    pickPano();
}

async function pickPano() {
    if (availablePanos.length === 0) return;

    const randomIndex = Math.floor(Math.random() * availablePanos.length);
    const [panorama] = availablePanos.splice(randomIndex, 1);
    loadPanorama(panorama);
    pictureCoords = await parseExif(panorama);
}

async function parseExif(file){
    try {
      // Parse all standard EXIF tags
      const data = await exifr.gps(file);
      
      console.log('Pano Location:', data.latitude, data.longitude);
      return L.latLng(data.latitude, data.longitude);
    } catch (err) {
      console.error('Error parsing EXIF:', err);
    }
}

// Source - https://stackoverflow.com/a/365853
// Posted by cletus, modified by community. See post 'Timeline' for change history
// Retrieved 2026-09-26, License - CC BY-SA 4.0

function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

function distanceInMBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    var earthRadiusM = 6371000;
    
    var dLat = degreesToRadians(lat2-lat1);
    var dLon = degreesToRadians(lon2-lon1);
    
    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return earthRadiusM * c;
}

function submitGuess(){
    var guess = getGuessCoords();
    dist = distanceInMBetweenEarthCoordinates(guess.lat, guess.lng, pictureCoords.lat, pictureCoords.lng);
    console.log('Guess vs coords', dist);
    showAnswerMap(pictureCoords);
}