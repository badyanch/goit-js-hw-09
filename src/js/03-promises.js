import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');
const btnEl = formRef.querySelector('button[type="submit"]');

formRef.addEventListener('submit', evt => {
  evt.preventDefault();
  btnEl.setAttribute('disabled', '');

  const {
    elements: { delay, step, amount },
  } = evt.currentTarget;

  if (
    formValidation(
      Number(delay.value),
      Number(step.value),
      Number(amount.value)
    )
  ) {
    btnEl.removeAttribute('disabled');

    return;
  }

  let currentDelay = Number(delay.value);

  for (let i = 1; i <= amount.value; i += 1) {
    createPromise(i, currentDelay)
      .then(value => Notify.success(value))
      .catch(error => Notify.failure(error))
      .finally(() => {
        if (Number(amount.value) === i) {
          btnEl.removeAttribute('disabled');
        }
      });

    currentDelay += Number(step.value);
  }
});

function formValidation(delay, step, amount) {
  if (delay < 0 || step < 0 || amount < 0) {
    Notify.failure('Negative numbers are invalid.');
    return true;
  }

  if (!amount) {
    Notify.failure('Create at least one promise.');
    return true;
  }

  return false;
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}