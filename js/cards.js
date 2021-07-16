const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

//Generate Phrases for different values
//Source: https://proweb63.ru/help/js/declension-in-js
const getDeclinationOfWordsByNumber = (number, txt, cases = [2, 0, 1, 1, 1, 2]) => txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];

const DICTIONARY_ROOMS = [
  'комната',
  'комнаты',
  'комнат',
];

const DICTIONARY_ROOMS_WITH_GUESTS = [
  'комната для ',
  'комнаты для ',
  'комнат для ',
];

const DICTIONARY_GUESTS = [
  'гость',
  'гостя',
  'гостей',
];

const DICTIONARY_GUESTS_WITH_ROOMS = [
  'гостя',
  'гостей',
  'гостей',
];

const generateRoomsAndGuestsPhrases = (rooms, guests) => {
  const guestsDescription = rooms
    ? `${guests} ${getDeclinationOfWordsByNumber(guests, DICTIONARY_GUESTS_WITH_ROOMS)}`
    : `${guests} ${getDeclinationOfWordsByNumber(guests, DICTIONARY_GUESTS)}`;
  const roomsDescription = guests
    ? `${rooms} ${getDeclinationOfWordsByNumber(rooms, DICTIONARY_ROOMS_WITH_GUESTS)}`
    : `${rooms} ${getDeclinationOfWordsByNumber(rooms, DICTIONARY_ROOMS)}`;

  return {
    firstPhrase: roomsDescription,
    secondPhrase: guestsDescription,
  };
};

const generateTimePhrases = (checkin, checkout) => {
  const checkoutReaction = checkin ? `, выезд до ${checkout}` : `Выезд до ${checkout}`;
  const checkinReaction = `Заезд после ${checkin}`;

  return {
    firstPhrase: checkinReaction,
    secondPhrase: checkoutReaction,
  };
};

const isEmpty = (valueToCheck, elementHidden) => {
  if (!valueToCheck || (valueToCheck.length === 0)) {
    elementHidden.classList.add('hidden');
  }
  return (!valueToCheck || (valueToCheck.length === 0));
};

const renderDoubleElements = (elementFirst, elementSecond, callback, newElement) => {
  const phrases = callback(elementFirst, elementSecond);

  if (!elementFirst) {
    newElement.textContent = phrases.secondPhrase;
  }
  if (!elementSecond) {
    newElement.textContent = phrases.firstPhrase;
  }
  if (!elementFirst && !elementSecond) {
    newElement.classList.add('hidden');
  }
  if (elementFirst && elementSecond) {
    newElement.textContent = `${phrases.firstPhrase}${phrases.secondPhrase}`;
  }
};

const getOfferType = (type) => {
  switch (type) {
    case ('palace'):
      return 'Дворец';
    case ('flat'):
      return 'Квартира';
    case ('house'):
      return 'Дом';
    case ('bungalow'):
      return 'Бунгало';
    case ('hotel'):
      return 'Отель';
  }
};

const getFeatures = (featureData, element) => {
  element.classList.remove('popup__feature--wifi');
  element.classList.add(`popup__feature--${featureData}`);
  return element;
};

const getPhotos = (photosData, element) => {
  element.src = photosData;
  return element;
};

//Generate features
//Generate Photos of place
const renderElements = (elementsData, template, callback, newElement) => {
  if (!isEmpty(elementsData, newElement)) {
    const elementsListFragment = document.createDocumentFragment();
    newElement.innerHTML = '';

    elementsData.forEach((element) => {
      const elementTemplate = template.cloneNode(true);
      elementsListFragment.appendChild(callback(element, elementTemplate));
    });

    newElement.appendChild(elementsListFragment);
  }
};

const setContent = (valueToCheck, element, elementProperty = 'textContent', valueToSet) => {
  if (!isEmpty(valueToCheck, element)) {
    element[elementProperty] = valueToSet ? valueToSet : valueToCheck;
  }
};

const generateCard = (singleAd) => {
  const {
    author: {avatar: avatarData},
    offer: {
      title: titleData,
      address: addressData,
      price: priceData,
      type: typeData,
      rooms: roomsData,
      guests: guestsData,
      checkin: checkinData,
      checkout: checkoutData,
      features: featuresData,
      description: descriptionData,
      photos: photosData,
    },
  } = singleAd;
  const adElement = cardTemplate.cloneNode(true);
  const avatar = adElement.querySelector('.popup__avatar');
  const title = adElement.querySelector('.popup__title');
  const address = adElement.querySelector('.popup__text--address');
  const price = adElement.querySelector('.popup__text--price');
  const type = adElement.querySelector('.popup__type');
  const capacity = adElement.querySelector('.popup__text--capacity');
  const time = adElement.querySelector('.popup__text--time');
  const features = adElement.querySelector('.popup__features');
  const featureElements = features.querySelectorAll('.popup__feature');
  const description = adElement.querySelector('.popup__description');
  const photos = adElement.querySelector('.popup__photos');
  const photo = photos.querySelector('.popup__photo');

  //Generate Avatar
  setContent(avatarData, avatar, 'src');
  //Generate Title
  setContent(titleData, title);
  //Generate Address
  setContent(addressData, address);
  //Generate Price
  setContent(priceData, price, 'textContent', `${priceData} ₽/ночь`);
  //Generate Type of place
  setContent(typeData, type, 'textContent', getOfferType(typeData));
  //Generate Number of guests and rooms
  renderDoubleElements(roomsData, guestsData, generateRoomsAndGuestsPhrases, capacity);
  //Generate time of checkin/checkout
  renderDoubleElements(checkinData, checkoutData, generateTimePhrases, time);
  //Generate features
  renderElements(featuresData, featureElements[0], getFeatures, features);
  //Generate Desctription
  setContent(descriptionData, description);
  //Generate Photos of place
  renderElements(photosData, photo, getPhotos, photos);
  return adElement;
};

export {generateCard};
