// Update the timer text from the remaining number of seconds.
const timerDisplay = document.getElementById("timer");
let timeLeft = 60;
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
    timeLeft = 60;
}

// Restart the countdown from its current time.
function startTimer() {
    if (interval) clearInterval(interval);
    updateDisplay();
    interval = setInterval(countdown, 1000);
}

// Stop the countdown without resetting its remaining time.
function resetTimer() {
    clearInterval(interval);
}