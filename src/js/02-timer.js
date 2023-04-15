// Описаний в документації
import flatpickr from 'flatpickr';

// all modules
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import '../css/timer-styles.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    checkedDate(selectedDates[0]);
  },
};

let intervalId = null;

const textInput = document.querySelector('input#datetime-picker');
const flatpickrEl = flatpickr(textInput, options);

const timer = document.querySelector('.timer');

const refs = {
  btnStart: document.querySelector('[data-start]'),
  daysField: timer.querySelector('[data-days]'),
  hoursField: timer.querySelector('[data-hours]'),
  minutesField: timer.querySelector('[data-minutes]'),
  secondsField: timer.querySelector('[data-seconds]'),
};

refs.btnStart.addEventListener('click', onStartTimer);

disabledBtn();

function onStartTimer() {
  disabledBtn();
  toggelTextInputActivity();

  const deltaTime = calculationDeltaTime();

  if (deltaTime <= 0) {
    Notify.failure('The date you chose has already arrived.');
    toggelTextInputActivity();

    return;
  }

  const timeComponents = convertMs(deltaTime);

  updateClockface(timeComponents);

  intervalId = setInterval(() => {
    const deltaTime = calculationDeltaTime();

    if (deltaTime <= 0) {
      Notify.success('The timer has finished its work.');
      toggelTextInputActivity();
      clearInterval(intervalId);

      return;
    }

    const timeComponents = convertMs(deltaTime);

    updateClockface(timeComponents);
  }, 1000);
}

function checkedDate(selectedDates) {
  if (Date.now() > selectedDates) {
    Notify.failure('Please choose a date in the future');

    if (!refs.btnStart.hasAttribute('disabled')) {
      refs.btnStart.setAttribute('disabled', '');
    }
    return;
  }

  if (refs.btnStart.hasAttribute('disabled')) {
    refs.btnStart.removeAttribute('disabled');
  }
}

function disabledBtn() {
  refs.btnStart.setAttribute('disabled', '');
}

function toggelTextInputActivity() {
  textInput.toggleAttribute('disabled');
}

function calculationDeltaTime() {
  return flatpickrEl.selectedDates[0].getTime() - Date.now();
}

function updateClockface({ days, hours, minutes, seconds }) {
  refs.daysField.textContent = days;
  refs.hoursField.textContent = hours;
  refs.minutesField.textContent = minutes;
  refs.secondsField.textContent = seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}