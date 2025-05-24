import iziToast from 'izitoast';

const form = document.querySelector('.form');

function showMessage(type, message) {
  iziToast[type]({
    message,
    position: 'topRight',
    progressBar: false,
    icon: null,
  });
}

function onFormSubmit(event) {
  event.preventDefault();

  const { delay, state } = Object.fromEntries(
    new FormData(event.currentTarget)
  );

  new Promise((resolve, reject) =>
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve();
      } else {
        reject();
      }
    }, +delay)
  )
    .then(() => {
      showMessage('success', `✅ Fulfilled promise in ${delay}ms`);
    })
    .catch(() => {
      showMessage('error', `❌ Rejected promise in ${delay}ms`);
    });

  form.reset();
}

form.addEventListener('submit', onFormSubmit);
