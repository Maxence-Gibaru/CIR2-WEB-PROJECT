// Mise à jour pour afficher le temps correctement avec deux chiffres
function pad(number) {
  return number < 10 ? "0" + number : number;
}

let number = document.getElementById("number");

/* function saveTime(hours, minutes, secondes) {
  localStorage.setItem("hours", JSON.stringify(hours));
  localStorage.setItem("minutes", JSON.stringify(minutes));
  localStorage.setItem("secondes", JSON.stringify(secondes));
}

function loadTime() {
  const hour = JSON.parse(localStorage.getItem("hours")) || [];
  const minutes = JSON.parse(localStorage.getItem("minutes")) || [];
  const secondes = JSON.parse(localStorage.getItem("secondes")) || [];
  time.setTime(hour, minutes, secondes);
} */

let time = {
  minutes: 0,
  secondes: 0,
  timer: null,
  displayTime: function () {
    number.textContent = `${pad(this.minutes)}:${pad(this.secondes)}`;
  },
  setTime: function (minutesValue, secondesValue) {
    this.minutes = minutesValue;
    this.secondes = secondesValue;
  },
  decreaseTime: function () {
    this.secondes--;
    if (this.secondes < 0) {
      this.secondes = 59;
      this.minutes--;
    }
    if (this.minutes < 0) {
      this.minutes = 59;
      this.hours--;
    }
  },
  start: function () {
    if (this.timer === null) {
      this.timer = setInterval(() => {
        this.decreaseTime();
        this.displayTime();
        console.log(this.timer);
      }, 1000);
    }
  },
  stop: function () {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },

  initialTimer: function () {
    this.setTime(25, 0);
    this.displayTime();
  },
};

const buttons = document.querySelectorAll(".selection-buttons button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    let newValue = button.textContent;
    time.setTime(newValue, 0);
    time.displayTime();
  });
});

/* time.addEventListener("change", () => {
  saveTime(time.hours, time.minutes, time.secondes);
});
 */

time.initialTimer();
time.displayTime(); // Affiche le temps initial

/* time.start(); // Commence le compte à rebours */

let stopButton = document.getElementById("stopButton");
stopButton.addEventListener("click", () => {
  time.stop();
});

let startButton = document.getElementById("startButton");
startButton.addEventListener("click", () => {
  time.start();
});

/* window.addEventListener("load", loadTime); */
