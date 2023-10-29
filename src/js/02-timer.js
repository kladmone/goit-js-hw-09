import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const startButton = document.querySelector('[data-start]');
    const chosenDate = selectedDates[0];
    if (chosenDate < new Date()) {
      window.alert('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};
flatpickr('#datetime-picker', options);

const timer = document.querySelector('.timer');
timer.style.display = 'flex';
timer.style.columnGap = '20px';

const startButton = document.querySelector('[data-start]');
startButton.addEventListener('click', () => {
  const chosenDate = new Date(document.querySelector('#datetime-picker').value);
  if (chosenDate < new Date()) {
    return window.alert('Please choose a date in the future');
  }

  startButton.disabled = true;

  const interval = setInterval(() => {
    const now = new Date().getTime();
    const distance = chosenDate.getTime() - now;

    if (distance < 0) {
      clearInterval(interval);
      startButton.disabled = false;
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.querySelector('[data-days]').textContent =
      days < 10 ? `0${days}` : days;
    document.querySelector('[data-hours]').textContent =
      hours < 10 ? `0${hours}` : hours;
    document.querySelector('[data-minutes]').textContent =
      minutes < 10 ? `0${minutes}` : minutes;
    document.querySelector('[data-seconds]').textContent =
      seconds < 10 ? `0${seconds}` : seconds;
  }, 1000);
});
