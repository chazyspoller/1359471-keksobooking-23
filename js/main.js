const NUMBER_OF_ADS = 10;

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

//generating an image paths
const avatarsUrl = (index) => {
  const avatarURL = (index < NUMBER_OF_ADS) ? `img/avatars/user0${index}.png` : `img/avatars/user${index}.png`;
  return avatarURL;
};

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

const getRandomArrayElement = (elements) => {
  const randomElement = elements[getRandomInteger(0, elements.length - 1)];
  return randomElement;
};

const getSomeRandomElements = (arrayLength, elements) => {
  const arrayCopy = elements.slice();
  const randomArray = [];
  for (let index = 0; index < arrayLength; index++) {
    randomArray[index] = getRandomArrayElement(arrayCopy);
    arrayCopy.splice(arrayCopy.indexOf(randomArray[index]), 1);
  }
  return randomArray;
};

const createAd = (index) => {
  const ad = {
    author: {
      avatar: avatarsUrl(index),
    },
    offer: {
      title: 'Объявление',
      address: `${getRandomFractionalNumber(35.65, 35.7, 5)}, ${getRandomFractionalNumber(139.7, 139.8, 5)}`,
      price: getRandomInteger(0, 100),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInteger(1, 5),
      guests: getRandomInteger(1, 5),
      checkin: getRandomArrayElement(TIME),
      checkout: getRandomArrayElement(TIME),
      features: getSomeRandomElements(getRandomInteger(1, FEATURES.length), FEATURES),
      description: 'Лучшее место',
      photos: getSomeRandomElements(getRandomInteger(1, 6), PHOTOS),
    },
    location: {
      lat: getRandomFractionalNumber(35.65, 35.7, 5),
      lng: getRandomFractionalNumber(139.7, 139.8, 5),
    },
  };
  return ad;
};

const setOfAds = new Array(NUMBER_OF_ADS).fill(null);

for (let index = 0; index < NUMBER_OF_ADS; index++) {
  setOfAds[index] = createAd(index + 1);
}
