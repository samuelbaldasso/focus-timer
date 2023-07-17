const span = document.querySelector("span");
const play = document.querySelector(".play svg path");
const stop = document.querySelector(".stop svg path");
const addFive = document.querySelector(".add svg path");
const decrementFive = document.querySelector(".decrease svg path");
const body = document.querySelector("body");
const sun = document.querySelectorAll("header img")[0];
const moon = document.querySelectorAll("header img")[1];
const florestInput = document.querySelector(".florest input");
const rainInput = document.querySelector(".rain input");
const fireInput = document.querySelector(".fire input");
const standInput = document.querySelector(".stand input");

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

florest.addEventListener("input", () => {
  sound1.volume = florestInput.value / 100;
});

stand.addEventListener("input", () => {
  sound2.volume = standInput.value / 100;
});

rain.addEventListener("input", () => {
  sound3.volume = rainInput.value / 100;
});

fire.addEventListener("input", () => {
  sound4.volume = fireInput.value / 100;
});

function resetSndCards(button) {
  const paths = button.querySelectorAll("path");
  const input = button.querySelector("input");
  currentColor = !currentColor;
  if (!body.classList.contains("dark")) {
    if (currentColor) {
      paths[0].style.fill = "#fff";
      button.style.backgroundColor = "#02799D";
      input.classList.add("active");
    } else {
      paths[0].style.fill = "#323238";
      button.style.backgroundColor = "#E1e1e6";
      input.classList.remove("active");
    }
  } else {
    if (currentColor) {
      paths[0].style.fill = "#fff";
      button.style.backgroundColor = "#02799D";
      input.classList.add("active");
    } else {
      paths[0].style.fill = "#E1e1e6";
      button.style.backgroundColor = "#323238";
      input.classList.remove("active");
    }
  }
}

function restoreSndCardsColors(svg) {
  const paths = svg.querySelectorAll("path");
  if (!body.classList.contains("dark")) {
    // Restaurar a cor do primeiro path
    paths[0].style.fill = "#323238";
    svg.style.backgroundColor = "#e1e1e6";

  }else{
    paths[0].style.fill = "#e1e1e6";
    svg.style.backgroundColor = "#323238";
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

sun.addEventListener("click", () => {
  sun.classList.add("hide");
  moon.classList.remove("hide");
  body.classList.toggle("dark");
  restoreSndCardsColors(florest);
  restoreSndCardsColors(rain);
  restoreSndCardsColors(stand);
  restoreSndCardsColors(fire);
});

moon.addEventListener("click", () => {
  moon.classList.add("hide");
  sun.classList.remove("hide");
  body.classList.toggle("dark");
  restoreSndCardsColors(florest);
  restoreSndCardsColors(rain);
  restoreSndCardsColors(stand);
  restoreSndCardsColors(fire);
});
