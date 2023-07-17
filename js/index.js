const span = document.querySelector("span");
const play = document.querySelector(".play");
const stop = document.querySelector(".stop");
const addFive = document.querySelector(".add");
const decrementFive = document.querySelector(".decrease");

let minutesDisplay = parseInt(span.innerHTML.slice(0, 2));
let secondsDisplay = parseInt(span.innerHTML.slice(3, 5));
let timer;
let currentAudio;
let currentColor = false;

function countdownTimer() {
  let minutes = prompt("Digite os minutos:");

  if (minutes !== null && minutes !== "") {
    minutesDisplay = parseInt(minutes) - 1;
    secondsDisplay = 59;
    updateDisplay();
    timer = setInterval(updateTime, 1000);
  }
}

function updateDisplay() {
  span.innerHTML = `${String(minutesDisplay).padStart(2, "0")}:${String(
    secondsDisplay
  ).padStart(2, "0")}`;
}

function updateTime() {
  if (secondsDisplay === 0) {
    if (minutesDisplay === 0) {
      clearInterval(timer);

      return;
    } else {
      minutesDisplay--;
      secondsDisplay = 59;
    }
  } else {
    secondsDisplay--;
  }
  updateDisplay();
}

play.addEventListener("click", (e) => {
  e.preventDefault();
  countdownTimer();
});

stop.addEventListener("click", () => {
  clearInterval(timer);
  minutesDisplay = 0;
  secondsDisplay = 0;
  updateDisplay();
});

addFive.addEventListener("click", () => {
  minutesDisplay += 5;
  updateDisplay();
});

decrementFive.addEventListener("click", () => {
  if (minutesDisplay >= 5) {
    minutesDisplay -= 5;
    updateDisplay();
  }
});

const florest = document.querySelector(".florest");
const stand = document.querySelector(".stand");
const rain = document.querySelector(".rain");
const fire = document.querySelector(".fire");

const sound1 = new Audio("../sounds/florest.wav");
const sound2 = new Audio("../sounds/stand.wav");
const sound3 = new Audio("../sounds/rain.wav");
const sound4 = new Audio("../sounds/fire.wav");

function setAudio(audio) {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  if (currentAudio !== audio) {
    audio.play();
    currentAudio = audio;
  } else {
    currentAudio = null;
  }
}

function resetSndCards(svg) {
  const paths = svg.querySelectorAll("path");
  currentColor = !currentColor;
  if (currentColor) {
    if (paths.length >= 2) {
      const secondPath = paths[1];
      secondPath.style.fill = "#fff";
    } else {
      console.log("Não foi encontrado o segundo path no SVG.");
    }
    paths[0].style.fill = "#02799D";
  } else {
    if (paths.length >= 2) {
      const secondPath = paths[1];
      secondPath.style.fill = "#323238";
    } else {
      console.log("Não foi encontrado o segundo path no SVG.");
    }
    paths[0].style.fill = "#E1E1E6";
  }
}

florest.addEventListener("click", () => {
  setAudio(sound1);
  resetSndCards(florest);
});

stand.addEventListener("click", () => {
  setAudio(sound2);
  resetSndCards(stand);
});

rain.addEventListener("click", () => {
  setAudio(sound3);
  resetSndCards(rain);
});

fire.addEventListener("click", () => {
  setAudio(sound4);
  resetSndCards(fire);
});
