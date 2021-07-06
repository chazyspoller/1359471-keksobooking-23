const getRandomInteger = (minValue, maxValue) => {
  const min = Math.ceil(minValue);
  const max = Math.floor(maxValue);

  if (minValue >= 0 && maxValue >= minValue) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  return null;
};

const getRandomFractionalNumber = (minValue, maxValue, numbersAfterComma = 1) => {
  if (minValue >= 0 && maxValue >= minValue && numbersAfterComma >= 0) {
    const randomNumber = Math.random() * (maxValue - minValue) + minValue;

    return +randomNumber.toFixed(numbersAfterComma);
  }
  return null;
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getSomeRandomElementsWithoutRepeat = (arrayLength, elements) => {
  const arrayCopy = elements.slice();
  const randomArray = [];
  for (let index = 0; index < arrayLength; index++) {
    randomArray[index] = getRandomArrayElement(arrayCopy);
    arrayCopy.splice(arrayCopy.indexOf(randomArray[index]), 1);
  }
  return randomArray;
};

const showMessage = (message) => {
  const messageContainer = document.createElement('div');
  messageContainer.style.zIndex = 500;
  messageContainer.style.position = 'fixed';
  messageContainer.style.left = '25%';
  messageContainer.style.right = '25%';
  messageContainer.style.top = '30%';
  messageContainer.style.padding = '15px 5px';
  messageContainer.style.fontSize = '20px';
  messageContainer.style.color = 'red';
  messageContainer.style.textAlign = 'center';
  messageContainer.style.backgroundColor = 'black';
  messageContainer.style.boxShadow = '0 0 10px 0 grey';

  messageContainer.textContent = message;

  document.body.append(messageContainer);

  setTimeout(() => {
    messageContainer.remove();
  }, 5000);
};

export {getRandomInteger, getRandomFractionalNumber, getRandomArrayElement, getSomeRandomElementsWithoutRepeat, showMessage};
