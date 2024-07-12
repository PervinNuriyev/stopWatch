const startBtn = document.querySelector("#startBtn");
const stopBtn = document.querySelector("#stopBtn");
const resetBtn = document.querySelector("#resetBtn");
const lapBtn = document.querySelector("#lapBtn");
const hoursSpan = document.querySelector("#hours");
const minutesSpan = document.querySelector("#minutes");
const secondsSpan = document.querySelector("#seconds");
const millisecondsSpan = document.querySelector("#milliseconds");
const lapsContainer = document.querySelector("#laps");

let startTime;
let updatedTime;
let difference;
let interval;
let stopped = true;
let running = false;
let lapCount = 0;

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", addLap);

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        interval = setInterval(updateTime, 10);
        running = true;
        stopped = false;
    }
}

function stopTimer() {
    if (!stopped) {
        clearInterval(interval);
        running = false;
        stopped = true;
    }
}

function resetTimer() {
    clearInterval(interval);
    running = false;
    stopped = true;
    difference = 0;
    hoursSpan.innerHTML = "00";
    minutesSpan.innerHTML = "00";
    secondsSpan.innerHTML = "00";
    millisecondsSpan.innerHTML = "00";
    lapsContainer.innerHTML = "";
    lapCount = 0;
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (3600000 * 24)) / 3600000);
    let minutes = Math.floor((difference % 3600000) / 60000);
    let seconds = Math.floor((difference % 60000) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    if (hours < 10) {
        hoursSpan.innerHTML = "0" + hours;
    } else {
        hoursSpan.innerHTML = hours;
    }

    if (minutes < 10) {
        minutesSpan.innerHTML = "0" + minutes;
    } else {
        minutesSpan.innerHTML = minutes;
    }

    if (seconds < 10) {
        secondsSpan.innerHTML = "0" + seconds;
    } else {
        secondsSpan.innerHTML = seconds;
    }

    if (milliseconds < 10) {
        millisecondsSpan.innerHTML = "0" + milliseconds;
    } else {
        millisecondsSpan.innerHTML = milliseconds;
    }
}

function addLap() {
    if (running) {
        lapCount++;
        const lapTime = hoursSpan.innerHTML + ":" + minutesSpan.innerHTML + ":" + secondsSpan.innerHTML + ":" + millisecondsSpan.innerHTML;
        const lapElement = document.createElement("div");
        lapElement.innerHTML = lapCount + ". " + lapTime;
        lapsContainer.appendChild(lapElement);
    }
}