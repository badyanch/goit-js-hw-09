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
      console.log(selectedDates[0]);
    },
  };
let intervalEl = null;

const textInput = document.querySelector('input#datetime-picker');
const flatpickrEl = flatpickr(textInputRef, options);