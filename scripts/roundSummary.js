const summaryContainer = document.getElementById("roundSummaryContainer");

const roundSummaryText = document.getElementById("summaryRound");
const distanceSummaryText = document.getElementById("summaryDistance");
const pointSummaryText = document.getElementById("summaryPoints");

function showSummary(round, dist, points){
    roundSummaryText.textContent = "Round " + round;
    distanceSummaryText.textContent = dist + " M";
    pointSummaryText.textContent = "" + points;

    summaryContainer.classList.remove('hide');
}

function hideSummary(){
    summaryContainer.classList.add('hide');
}

hideSummary();