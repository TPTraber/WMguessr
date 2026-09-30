import { getRequiredElement } from "./util/uiUtil";

const summaryContainer = getRequiredElement("roundSummaryContainer");

const roundSummaryText = getRequiredElement("summaryRound");
const distanceSummaryText = getRequiredElement("summaryDistance");
const pointSummaryText = getRequiredElement("summaryPoints");

export function showSummary(round : number, dist : number, points : number, didntGuess=false){

    roundSummaryText.textContent = "Round " + round;

    if(didntGuess){
        points = 0;
        distanceSummaryText.textContent = "N/A M";
        roundSummaryText.textContent = "You Didn't Guess!";
    }
    else{
        distanceSummaryText.textContent = dist + " M";
    }
    
    pointSummaryText.textContent = "" + points;

    summaryContainer.classList.remove('hide');
}

export function hideSummary(){
    summaryContainer.classList.add('hide');
}

hideSummary();