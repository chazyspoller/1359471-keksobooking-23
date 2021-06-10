import {getRandomInteger, getRandomFractionalNumber, getRandomArrayElement, getSomeRandomElements} from './util.js';

const NUMBER_OF_ADS = 10;
const LAT_MIN = 35.65;
const LAT_MAX = 35.7;
const LNG_MIN = 139.7;
const LNG_MAX = 139.8;
const NUMBERS_AFTER_COMMA = 5;
const PRICE_MIN = 0;
const PRICE_MAX = 100;
const PARAMETER_MIN = 1;
const PARAMENTER_MAX = 6;

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

//generation of image paths
const getAvatarsUrl = (index) => (index < NUMBER_OF_ADS) ? `img/avatars/user0${index}.png` : `img/avatars/user${index}.png`;

const createAd = (index) => {
  const latCoordinate = getRandomFractionalNumber(LAT_MIN, LAT_MAX, NUMBERS_AFTER_COMMA);
  const lngCoordinate = getRandomFractionalNumber(LNG_MIN, LNG_MAX, NUMBERS_AFTER_COMMA);

  return {
    author: {
      avatar: getAvatarsUrl(index),
    },
    offer: {
      title: 'Объявление',
      address: `${latCoordinate}, ${lngCoordinate}`,
      price: getRandomInteger(PRICE_MIN, PRICE_MAX),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInteger(PARAMETER_MIN, PARAMENTER_MAX),
      guests: getRandomInteger(PARAMETER_MIN, PARAMENTER_MAX),
      checkin: getRandomArrayElement(TIME),
      checkout: getRandomArrayElement(TIME),
      features: getSomeRandomElements(getRandomInteger(PARAMETER_MIN, FEATURES.length), FEATURES),
      description: 'Лучшее место',
      photos: getSomeRandomElements(getRandomInteger(PARAMETER_MIN, PARAMENTER_MAX), PHOTOS),
    },
    location: {
      lat: latCoordinate,
      lng: lngCoordinate,
    },
  };
};

export {createAd, NUMBER_OF_ADS};
