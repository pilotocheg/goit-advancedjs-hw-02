import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

const startButton = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

let userSelectedDate = null;
let interval;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function printTime() {
  const deltaTime = userSelectedDate.getTime() - Date.now();

  const { days, hours, minutes, seconds } = convertMs(deltaTime);

  if (deltaTime >= 0) {
    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
  }

  return deltaTime;
}

function setStartBtnDisabled(disabled) {
  startButton.disabled = disabled;
}

function startTimer() {
  setStartBtnDisabled(true);

  printTime();

  interval = setInterval(() => {
    const deltaTime = printTime();

    if (deltaTime <= 0) {
      clearInterval(interval);
      return;
    }
  }, 1000);
}

startButton.addEventListener('click', startTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const [selectedDate] = selectedDates;

    if (selectedDate.getTime() < Date.now()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });

      setStartBtnDisabled(true);

      return;
    }

    setStartBtnDisabled(false);
    userSelectedDate = selectedDate;
  },
};

flatpickr('#datetime-picker', options);
