import { createButton } from "./dom-content/elementCreator.js";

// Function to pad single digit numbers with a leading zero
function pad(number) {
  return number < 10 ? "0" + number : number;
}

// DOM elements
let timerDisplay = document.getElementById("timerDisplay");
let controlButtons = document.querySelector(".control-buttons");

// Timer object
let time = {
  minutes: 25,
  secondes: 0,
  timer: null,
  displayTime: function () {
    timerDisplay.textContent = `${pad(this.minutes)}:${pad(this.secondes)}`;
  },
  setTime: function (minutesValue, secondesValue) {
    this.minutes = minutesValue;
    this.secondes = secondesValue;
    this.displayTime();
  },
  decreaseTime: function () {
    if (this.secondes === 0) {
      if (this.minutes === 0) {
        this.completeCycle();
      } else {
        this.minutes--;
        this.secondes = 59;
      }
    } else {
      this.secondes--;
    }
    this.displayTime();
  },
  completeCycle: function () {
    this.stop();
    if (isWorkSession) {
      alert("Time for a break!");
      this.setTime(5, 0);
      isWorkSession = false;
    } else {
      alert("Break is over, back to work!");
      this.setTime(workDuration, 0);
      isWorkSession = true;
    }
    this.start();
  },
  start: function () {
    if (this.timer === null) {
      this.timer = setInterval(() => this.decreaseTime(), 1000);
    }
  },
  stop: function () {
    clearInterval(this.timer);
    this.timer = null;
  },
  reset: function () {
    this.stop();
    isWorkSession = true;
    this.setTime(workDuration, 0);
    this.displayTime();
  },
};

// Initial setup
let isWorkSession = true;
let workDuration = 25;
time.displayTime();

// Create start/stop button
let pomodoroButton = createButton("startButton", "Start", () => {
  if (time.timer === null) {
    pomodoroButton.textContent = "Stop";
    pomodoroButton.style.backgroundColor = "#000";
    time.start();
  } else {
    pomodoroButton.style.backgroundColor = document.documentElement.style.getPropertyValue('--main-color');
    pomodoroButton.textContent = "Resume";
    time.stop();
  }
});

// Add start/stop button to control buttons container
controlButtons.appendChild(pomodoroButton);

// Event listener for decrement button
document.getElementById("decrementButton").addEventListener("click", () => {
  if (time.minutes > 1 || (time.minutes === 1 && time.secondes > 0)) {
    time.stop();
    time.setTime(time.minutes - 1, 0);
    workDuration = time.minutes;
  }
});

// Event listener for increment button
document.getElementById("incrementButton").addEventListener("click", () => {
  time.stop();
  time.setTime(time.minutes + 1, 0);
  workDuration = time.minutes;
});
