var roundText = document.getElementById("rounds");

function updateRoundDisplay(round, roundTotal){
    roundText.textContent = round + "/" + roundTotal;
}