import {getRandomInteger, getRandomFractionalNumber, getRandomArrayElement, getSomeRandomElementsWithoutRepeat} from './util.js';

const NUMBER_OF_ADS = 10;
const LAT_MIN = 35.65;
const LAT_MAX = 35.7;
const LNG_MIN = 139.7;
const LNG_MAX = 139.8;
const NUMBERS_AFTER_COMMA = 5;
const PRICE_MIN = 1000;
const PRICE_MAX = 5000;
const PARAMETER_MIN = 0;
const PARAMENTER_MAX = 5;

const TITLES = [
  'Центр города как на ладони',
  'Тихое место для отдыха',
  'Удобная инфраструктура',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const TIME = [
  '',
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

const DESCRIPTIONS = [
  '',
  'Лучшее место для отдыха',
  'Прекрасный вид и удобный сервис',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

//generation of image paths
const getAvatarsUrl = (index) => (index < NUMBER_OF_ADS) ? `img/avatars/user0${index}.png` : `img/avatars/user${index}.png`;

const createAds = () => {
  const ads = [];

  for (let index = 1; index <= NUMBER_OF_ADS; index++) {
    const latCoordinate = getRandomFractionalNumber(LAT_MIN, LAT_MAX, NUMBERS_AFTER_COMMA);
    const lngCoordinate = getRandomFractionalNumber(LNG_MIN, LNG_MAX, NUMBERS_AFTER_COMMA);
    ads[index - 1] = {
      author: {
        avatar: getAvatarsUrl(index),
      },
      offer: {
        title: getRandomArrayElement(TITLES),
        address: `${latCoordinate}, ${lngCoordinate}`,
        price: getRandomInteger(PRICE_MIN, PRICE_MAX),
        type: getRandomArrayElement(TYPES),
        rooms: getRandomInteger(PARAMETER_MIN, PARAMENTER_MAX),
        guests: getRandomInteger(PARAMETER_MIN, PARAMENTER_MAX),
        checkin: getRandomArrayElement(TIME),
        checkout: getRandomArrayElement(TIME),
        features: getSomeRandomElementsWithoutRepeat(getRandomInteger(PARAMETER_MIN, FEATURES.length), FEATURES),
        description: getRandomArrayElement(DESCRIPTIONS),
        photos: getSomeRandomElementsWithoutRepeat(getRandomInteger(PARAMETER_MIN, PHOTOS.length), PHOTOS),
      },
      location: {
        lat: latCoordinate,
        lng: lngCoordinate,
      },
    };
  }
  return ads;
};

export {createAds};
