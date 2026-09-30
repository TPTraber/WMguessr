import { getRequiredElement } from "./util/uiUtil";

const summaryGameContainer = getRequiredElement("gameSummaryContainer");

const totalPointSummaryText = getRequiredElement("gameSummaryScore");

function showResults(points : number){
    totalPointSummaryText.textContent = "" + points;

    summaryGameContainer.classList.remove('hide');
}

function hideGameSummary(){
    summaryGameContainer.classList.add('hide');
}

hideGameSummary();