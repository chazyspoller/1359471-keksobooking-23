function getRandomInteger (minValue, maxValue) {
  const min = Math.ceil(minValue);
  const max = Math.floor(maxValue);

  if (minValue >= 0 && maxValue >= minValue) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return null;
}

getRandomInteger(5.55, 6.66);

function getRandomFractionalNumber (minValue, maxValue, numbersAfterComma) {
  if (minValue >= 0 && maxValue >= minValue && numbersAfterComma >= 0) {
    const randomNumber = Math.random() * (maxValue - minValue) + minValue;

    return +randomNumber.toFixed(numbersAfterComma);
  }

  return null;
}

getRandomFractionalNumber(5.06, 5.55, 3);

