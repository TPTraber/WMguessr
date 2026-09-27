const summaryGameContainer = document.getElementById("gameSummaryContainer");

const totalPointSummaryText = document.getElementById("gameSummaryScore");

function showResults(points){
    totalPointSummaryText.textContent = "" + points;

    summaryGameContainer.classList.remove('hide');
}

function hideGameSummary(){
    summaryGameContainer.classList.add('hide');
}

hideGameSummary();