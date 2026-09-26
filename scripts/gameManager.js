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
      return data
    } catch (err) {
      console.error('Error parsing EXIF:', err);
    }
}

function submitGuess(){
    var guess = getGuessCoords()
    console.log('Guess vs coords', pictureCoords.latitude)
    var points = Math.abs(guess.lat - pictureCoords.latitude);
    console.log(points)
}