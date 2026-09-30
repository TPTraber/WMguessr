import {getGuessCoords, hideMap, resetMap, lockMap} from './map'

import {startTimer, resetTimer} from './timer'

import{getRequiredElement} from './util/uiUtil'

import{distanceInMBetweenEarthCoordinates} from './util/mathUtil'

import {initPano, loadPanorama, removePano} from './panorama'

import {hideSummary, } from './roundSummary'

var pictureCoords = L.latLng();
var round = 0;
var totalRounds = 5;
var pointTotal = 0;
var guessingTime = 30;

enum GameState {
    GUESSING,
    POSTGUESS,
    RESULTS,
}

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


// Initialize the timer, panorama, and campus map.
function startGame() {
    //TODO Move to UI script
   getRequiredElement("startbutton").classList.add('hidden');
    getRequiredElement("timerContainer").classList.remove('hidden');
    getRequiredElement("roundContainer").classList.remove('hidden');
    getRequiredElement("pointContainer").classList.remove('hidden');
    getRequiredElement("mapContainer").classList.remove('hidden');
    initPano();
    startRound();
}

function startRound(){
    getRequiredElement("guess").innerHTML = "Guess";
    round += 1;
    if(round > totalRounds) {
        hideSummary(); //UI ELEMENT
        endGame();
        return
    }
    hideSummary(); //UI ELEMENT
    resetMap();
    pickPano();
    currentState = GameState.GUESSING;
    startTimer(guessingTime);
    updateRoundDisplay(round, totalRounds); //UI ELEMENT
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



//TODO: Deal with invalid / no guess
function submitGuess(){
    switch(currentState){
        case GameState.GUESSING:
            resetTimer();
            var guess = getGuessCoords();
            var didntGuess = true;

            var dist = 0
            var points = 0

            if (typeof guess !== "undefined"){
                dist = distanceInMBetweenEarthCoordinates(guess.lat, guess.lng, pictureCoords.lat, pictureCoords.lng);
                points = 1000 * (1-((Math.min(150,Math.max(dist,15)-15))
                                    /150));
                points = Math.round(points);
                pointTotal += points;
                updatePointDisplay(pointTotal);//UI ELEMENT
                didntGuess = false;
            }

            showAnswerMap(pictureCoords); //UI ELEMENT
            showSummary(round, Math.round(dist), points, didntGuess); //UI ELEMENT
            lockMap();
            currentState = GameState.POSTGUESS;
            startTimer(10);
            getRequiredElement("guess").innerHTML = "Next";//UI ELEMENT
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
    getRequiredElement("guess").remove();
    showResults(pointTotal);
    hideMap(); 
}