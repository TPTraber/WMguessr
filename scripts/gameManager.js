var pictureCoords;
var round = 0;
var totalRounds = 5;
var pointTotal = 0;
var guessingTime = 60;

const GameState = Object.freeze({
    GUESSING: 'GUESSING',
    POSTGUESS: 'POSTGUESS',
    RESULTS: 'RESULTS'
});
console.log(`%%%%%%%%%##8+===+**********+++=--===+*******8888888
%%%########==*88*****88*******+++=====*888888888###
%%%%#%#%##+=**8*******8********+++====+8888888#####
%%%%%%%%#8+=888****************++++++==*88888######
@@%%%%%%#++8*=---=+*******+++=-----=+==+88888######
%#%%%%%%#+=8===----==++++++==-::-==-++==*888#######
%%%%%%%%*+=**==--:--========--::--=+++-==8#########
%%%%%%%#+==8+=--::-:-==++==-:::=--==++-==8#######%%
%%%#%%%*+==8++=+-====8-+=--=--::====++-===###%%%%%%
%%%%%##+===8**+===++-+*8*==+==-==+++++-===###%%%%%%
%%%%%##===-888******+88***=-++++++***+-=--+##%%%%%%
%%%%%%8==--+*+++***+*888***+++*+++***+:::--8##%%%%%
%%%%%%+=--:-*+--=+++8888***+=-+++++*+:,:---=8#%%%%%
######=+--::-++++++*8***+++*+=++++++,,,,--:-===+*##
%%%%#8==--:::+++++++=++=+==-===++++-,,,,:-:-:-===+8
%%##8+==-:::::*+++++++=--======+++,,,,,::-::=-----=
#####==--:::::+*+=++++=========++=,,,,:::::,-------
####8-=-:::::::=-:::::::::::::-==,,,,,,::::::------
88**+----::::,:,=----:::::-----:::,,,,,::::::------
`)
console.log("Why are you here???")
console.log("Do you really want to cheat? ಠ_ಠ")
console.log("Does it make you feel better.")
console.log("\n\n\n\n\n\n\n\n\nWhatever helps you sleep at night I guess")




let currentState = GameState.GUESSING;

// Start a round once all page elements are ready.
document.addEventListener("DOMContentLoaded", () => {
    startGame();
});

// Keep one shared pool so each panorama can be selected only once.
const availablePanos = [
    "resources/panoramas/IMG_20260926_162343_00_merged.jpg",
    "resources/panoramas/IMG_20260926_163720_00_merged.jpg",
    "resources/panoramas/IMG_20260926_163926_00_merged.jpg",
    "resources/panoramas/IMG_20260926_164403_00_merged.jpg",
    "resources/panoramas/IMG_20260926_164939_00_merged.jpg",
    "resources/panoramas/IMG_20260926_165319_00_merged.jpg",
    "resources/panoramas/IMG_20260926_170401_00_merged.jpg",
    "resources/panoramas/IMG_20260926_205108_00_merged.jpg",
    "resources/panoramas/IMG_20260926_205432_00_merged.jpg",
    "resources/panoramas/IMG_20260926_205632_00_merged.jpg",
    "resources/panoramas/IMG_20260926_205901_00_merged.jpg",
    "resources/panoramas/IMG_20260926_210108_00_merged.jpg",
    "resources/panoramas/IMG_20260926_210402_00_merged.jpg",
    "resources/panoramas/IMG_20260926_210550_00_merged.jpg",
    "resources/panoramas/IMG_20260926_210920_00_merged.jpg",
    "resources/panoramas/IMG_20260926_211718_00_merged.jpg",
    "resources/panoramas/IMG_20260926_211901_00_merged.jpg",
    "resources/panoramas/IMG_20260926_212022_00_merged.jpg",
    "resources/panoramas/IMG_20260926_212157_00_merged.jpg",
    "resources/panoramas/IMG_20260926_212814_00_merged.jpg",
    "resources/panoramas/IMG_20260926_212957_00_merged.jpg",
    "resources/panoramas/IMG_20260927_100357_00_merged.jpg",
    "resources/panoramas/IMG_20260927_100557_00_merged.jpg",
    "resources/panoramas/IMG_20260927_100653_00_merged.jpg",
    "resources/panoramas/IMG_20260927_100839_00_merged.jpg",
    "resources/panoramas/IMG_20260927_101421_00_merged.jpg",
    "resources/panoramas/IMG_20260927_101517_00_merged.jpg",
    "resources/panoramas/IMG_20260927_101616_00_merged.jpg",
    "resources/panoramas/IMG_20260927_101655_00_merged.jpg",
    "resources/panoramas/IMG_20260927_101735_00_merged.jpg",
    "resources/panoramas/IMG_20260927_101822_00_merged.jpg",
    "resources/panoramas/IMG_20260927_101903_00_merged.jpg",
    "resources/panoramas/IMG_20260927_101955_00_merged.jpg",
    "resources/panoramas/IMG_20260927_102056_00_merged.jpg",
    "resources/panoramas/IMG_20260927_102206_00_merged.jpg",
    "resources/panoramas/IMG_20260927_102346_00_merged.jpg",
    "resources/panoramas/IMG_20260927_102415_00_merged.jpg",
    "resources/panoramas/IMG_20260927_102446_00_merged.jpg",
    "resources/panoramas/IMG_20260927_102532_00_merged.jpg",
    "resources/panoramas/IMG_20260927_103226_00_merged.jpg",
    "resources/panoramas/IMG_20260927_103338_00_merged.jpg",
    "resources/panoramas/IMG_20260927_103504_00_merged.jpg",
    "resources/panoramas/IMG_20260927_103547_00_merged.jpg",
    "resources/panoramas/IMG_20260927_103658_00_merged.jpg",
    "resources/panoramas/IMG_20260927_103740_00_merged.jpg",
    "resources/panoramas/IMG_20260927_103807_00_merged.jpg",
    "resources/panoramas/IMG_20260927_103907_00_merged.jpg",
    "resources/panoramas/IMG_20260927_104003_00_merged.jpg",
    "resources/panoramas/IMG_20260927_104048_00_merged.jpg",
    "resources/panoramas/IMG_20260927_104120_00_merged.jpg"
];

// Initialize the timer, panorama, and campus map.
function startGame() {
    initPano();
    startRound();
}

function startRound(){
    document.getElementById("guess").innerHTML = "Guess";
    round += 1;
    if(round > totalRounds) {
        hideSummary();
        endGame();
        return
    }
    hideSummary();
    resetMap();
    pickPano();
    currentState = GameState.GUESSING;
    startTimer(guessingTime);
    updateRoundDisplay(round, totalRounds);
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

//TODO: Deal with invalid / no guess
function submitGuess(){
    switch(currentState){
        case GameState.GUESSING:
            resetTimer();
            var guess = getGuessCoords();
            var didntGuess = true;

            if (typeof guess !== "undefined"){
                dist = distanceInMBetweenEarthCoordinates(guess.lat, guess.lng, pictureCoords.lat, pictureCoords.lng);
                points = Math.max(Math.floor(200-dist), 0);
                pointTotal += points;
                updatePointDisplay(pointTotal);
                didntGuess = false;
            }
            else{
                points = 0;
                dist = 0;
            }
            showAnswerMap(pictureCoords);
            showSummary(round, dist, points, didntGuess);
            lockMap();
            currentState = GameState.POSTGUESS;
            startTimer(10);
            document.getElementById("guess").innerHTML = "Next";
            break;
        case GameState.POSTGUESS:
            startRound();
            break;

    }
    
}

function timerUp(){
    switch(currentState) {
        case GameState.GUESSING:
            submitGuess();
            break;
        
        case GameState.POSTGUESS:
            startRound();
            break;

        case GameState.RESULTS:
            console.log("Redirect to Home Page");
            break;
    }
}

function againAgain(){
    location.reload();
}

function endGame(){
    removePano();
    document.getElementById("guess").remove();
    showResults(pointTotal);
    hideMap();
}