const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
let intervalEl = null;

btnStop.setAttribute('disabled', '');

btnStart.addEventListener('click', onButtonStart);
btnStop.addEventListener('click', onButtonStop);

function onButtonStart() {
  onToggelBtnActivity();
  changeColorBody();

  intervalEl = setInterval(changeColorBody, 1000);
}

function onButtonStop() {
  clearInterval(intervalEl);

  onToggelBtnActivity();
}

function changeColorBody() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function onToggelBtnActivity() {
  btnStart.toggleAttribute('disabled');
  btnStop.toggleAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
  }