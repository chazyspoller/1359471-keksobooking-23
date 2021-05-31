function getRandomInteger (minValue, maxValue) {
  if (minValue >= 0 && maxValue >= 0) {
    if (maxValue >= minValue) {
      return Math.floor(Math.random() * (Math.floor(maxValue) - Math.ceil(minValue) + 1) + Math.ceil(minValue));
    }
    return 'Введите, пожалуйста, корректный диапозон (от меньшего к большему)';
  }

  return 'Введите, пожалуйста, неотрицательные значения для диапозона';
}

getRandomInteger(5.55, 6.66);

function getRandomFractionalNumber (minValue, maxValue, numbersAfterComma) {
  if (minValue >= 0 && maxValue >= 0) {
    if (maxValue >= minValue) {
      return (Math.random() * (maxValue - minValue) + minValue).toFixed(numbersAfterComma);
    }
    return 'Введите, пожалуйста, корректный диапозон (от меньшего к большему)';
  }

  return 'Введите, пожалуйста, неотрицательные значения для диапозона';
}

getRandomFractionalNumber(5.06, 5.55, 3);
