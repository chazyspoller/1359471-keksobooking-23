const RERENDER_DELAY = 500;

const showMessage = () => {
  const messageContainer = document.createElement('div');
  messageContainer.style.zIndex = 500;
  messageContainer.style.position = 'fixed';
  messageContainer.style.left = '25%';
  messageContainer.style.right = '25%';
  messageContainer.style.top = '30%';
  messageContainer.style.padding = '25px 5px';
  messageContainer.style.fontSize = '30px';
  messageContainer.style.color = '#f0f0ea';
  messageContainer.style.textAlign = 'center';
  messageContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  messageContainer.style.boxShadow = '0 0 15px 0 grey';

  messageContainer.textContent = 'Ошибка соединения! Обновите страницу для загрузки данных.';

  document.body.append(messageContainer);

  setTimeout(() => {
    messageContainer.remove();
  }, 5000);
};

const debounce = (callback, timeoutDelay = RERENDER_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {showMessage, debounce};
