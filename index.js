// Mise à jour pour afficher le temps correctement avec deux chiffres
function pad(number) {
  return number < 10 ? "0" + number : number;
}

let number = document.getElementById("number");

let time = {
  hours: 0,
  minutes: 0,
  secondes: 0,
  timer: null,
  displayTime: function () {
    number.textContent = `${pad(this.hours)}:${pad(this.minutes)}:${pad(
      this.secondes
    )}`;
  },
  setTime: function (hoursValue, minutesValue, secondesValue) {
    this.hours = hoursValue;
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
    if (this.hours < 0) {
      time.stop();
      alert("Le compte à rebours est terminé !");
    }
  },
  start: function () {
    if (this.timer === null) {
      this.timer = setInterval(() => {
        this.decreaseTime();
        this.displayTime();
      }, 1000);
    }
  },
  stop: function () {
    clearInterval(this.timer);
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
};

time.setTime(1, 16, 0); // Définit le temps initial

time.displayTime(); // Affiche le temps initial

time.start(); // Commence le compte à rebours

let stopButton = document.getElementById("stopButton");
stopButton.addEventListener("click", () => {
  time.stop();
});

let startButton = document.getElementById("startButton");
stopButton.addEventListener("click", () => {
  time.start();
});
