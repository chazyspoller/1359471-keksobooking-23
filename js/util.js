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

const getSomeRandomElements = (arrayLength, elements) => {
  const arrayCopy = elements.slice();
  const randomArray = [];
  for (let index = 0; index < arrayLength; index++) {
    randomArray[index] = getRandomArrayElement(arrayCopy);
    arrayCopy.splice(arrayCopy.indexOf(randomArray[index]), 1);
  }
  return randomArray;
};

export {getRandomInteger, getRandomFractionalNumber, getRandomArrayElement, getSomeRandomElements};
