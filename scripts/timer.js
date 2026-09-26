let timerDisplay = document.getElementById("timer");
let timeLeft = 60;
let interval = null;

function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    let minStr = minutes.toString().padStart(2, "0");
    let secStr = seconds.toString().padStart(2, "0");

    timerDisplay.textContent = minStr + ":" + secStr;
}

function countdown() {
    if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
    } else {
        clearInterval(interval);
        timeLeft = 60;
        alert("Time's up!");
    }
}

function startTimer() {
    if (interval) clearInterval(interval);
    updateDisplay();
    interval = setInterval(countdown, 1000);
}

function pauseTimer() {
    clearInterval(interval);
}