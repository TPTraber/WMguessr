// Update the timer text from the remaining number of seconds.
const timerDisplay = document.getElementById("timer");
let timeLeft = 30;
let interval = null;

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

// Decrement once per tick and stop when the round runs out.
function countdown() {
    if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
        return;
    }

    clearInterval(interval);

    //Timer UP
    timerUp();
}

// Restart the countdown from time given.
function startTimer(timeStart) {
    if (interval) clearInterval(interval);
    timeLeft = timeStart;
    updateDisplay();
    interval = setInterval(countdown, 1000);
}

// Stop the countdown without resetting its remaining time.
function resetTimer() {
    clearInterval(interval);
}