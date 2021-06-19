import {createAds} from './temporary-data.js';

const cardsList  = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const setOfAds = createAds();

const getOfferType = (type) => {
  let content = '';

  switch (type) {
    case ('palace'):
      content = 'Дворец';
      break;
    case ('flat'):
      content = 'Квартира';
      break;
    case ('house'):
      content = 'Дом';
      break;
    case ('bungalow'):
      content = 'Бунгало';
      break;
    case ('hotel'):
      content = 'Отель';
      break;
  }

  return content;
};

const getOfferFeatures = (features, template) => {
  const featuresListFragment = document.createDocumentFragment();

  features.forEach((element) => {
    const elementTemplate = template.cloneNode(true);
    elementTemplate.classList.add(`popup__feature--${element}`);
    featuresListFragment.appendChild(elementTemplate);
  });

  return featuresListFragment;
};

const getOfferPhotos = (photos, template) => {
  const photosListFragment = document.createDocumentFragment();

  photos.forEach((photoURL) => {
    const newPhoto = template.cloneNode(true);
    newPhoto.src = photoURL;
    photosListFragment.appendChild(newPhoto);
  });

  return photosListFragment;
};

const checkIfEmpty = (elementCheck, elementHidden) => {
  if (!elementCheck) {
    elementHidden.classList.add('hidden');
  }
};

const checkIfEmptyTwoParameters = (elementFirst, elementSecond, reactionFirst, reactionSecond, mainElement) => {
  if (!elementFirst) {
    mainElement.textContent = reactionFirst;
  }
  if (!elementSecond) {
    mainElement.textContent = reactionSecond;
  }
  if (!elementFirst && !elementSecond) {
    mainElement.classList.add('hidden');
  }
};

const generateCard = (singleAd) => {
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
  checkIfEmpty(singleAd.author.avatar, avatar);
  avatar.src = singleAd.author.avatar;

  //Generate Title
  checkIfEmpty(singleAd.offer.title, title);
  title.textContent = singleAd.offer.title;

  //Generate Address
  checkIfEmpty(singleAd.offer.address, address);
  address.textContent = singleAd.offer.address;

  //Generate Price
  checkIfEmpty(singleAd.offer.price, price);
  price.textContent = `${singleAd.offer.price} ₽/ночь`;

  //Generate Type of place
  checkIfEmpty(singleAd.offer.type, type);
  type.textContent = getOfferType(singleAd.offer.type);

  //Generate Number of guests and rooms
  checkIfEmptyTwoParameters(singleAd.offer.rooms, singleAd.offer.guests, `${singleAd.offer.guests} гостей`, `${singleAd.offer.rooms} комнаты`, capacity);
  if (singleAd.offer.rooms && singleAd.offer.guests) {
    capacity.textContent = `${singleAd.offer.rooms} комнаты для ${singleAd.offer.guests} гостей`;
  }

  //Generate time of checkin/checkout
  checkIfEmptyTwoParameters(singleAd.offer.checkin, singleAd.offer.checkout, `Выезд до ${singleAd.offer.checkout}`, `Заезд после ${singleAd.offer.checkin}`, time);
  if (singleAd.offer.checkout && singleAd.offer.checkin) {
    time.textContent = `Заезд после ${singleAd.offer.checkin}, выезд до ${singleAd.offer.checkout}`;
  }

  //Generate features
  checkIfEmpty(singleAd.offer.features, features);
  features.innerHTML = '';
  featureElements[0].classList.remove('popup__feature--wifi');
  features.appendChild(getOfferFeatures(singleAd.offer.features, featureElements[0]));

  //Generate Desctription
  checkIfEmpty(singleAd.offer.description, description);
  description.textContent = singleAd.offer.description;

  //Generate Photos of place
  photo.remove();
  checkIfEmpty(singleAd.offer.photos, photos);
  photos.appendChild(getOfferPhotos(singleAd.offer.photos, photo));

  return adElement;
};

cardsList.appendChild(generateCard(setOfAds[0]));
