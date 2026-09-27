const summaryContainer = document.getElementById("roundSummaryContainer");

const roundSummaryText = document.getElementById("summaryRound");
const distanceSummaryText = document.getElementById("summaryDistance");
const pointSummaryText = document.getElementById("summaryPoints");

function showSummary(round, dist, points, didntGuess=false){

    roundSummaryText.textContent = "Round " + round;

    if(didntGuess){
        dist = "N/A";
        points = 0;
        roundSummaryText.textContent = "You Didn't Guess!";
    }
    
    distanceSummaryText.textContent = dist + " M";
    pointSummaryText.textContent = "" + points;

    summaryContainer.classList.remove('hide');
}

function hideSummary(){
    summaryContainer.classList.add('hide');
}

hideSummary();