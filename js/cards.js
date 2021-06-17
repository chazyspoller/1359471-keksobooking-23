import {createAds} from './temporary-data.js';

const cardsList  = document.querySelector('#map-canvas');
const cardTemplay = document.querySelector('#card').content.querySelector('.popup');

const setOfAds = createAds();
const adsListFragment = document.createDocumentFragment();

setOfAds.forEach((singleAd) => {
  const adElement = cardTemplay.cloneNode(true);
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
  avatar.src = singleAd.author.avatar;

  //Generate Title
  title.textContent = singleAd.offer.title;

  //Generate Address
  address.textContent = singleAd.offer.address;

  //Generate Price
  price.textContent = `${singleAd.offer.price} ₽/ночь`;

  //Generate Type of place
  switch (singleAd.offer.type) {
    case ('palace'):
      type.textContent = 'Дворец';
      break;
    case ('flat'):
      type.textContent = 'Квартира';
      break;
    case ('house'):
      type.textContent = 'Дом';
      break;
    case ('bungalow'):
      type.textContent = 'Бунгало';
      break;
    case ('hotel'):
      type.textContent = 'Отель';
      break;
  }

  //Generate Number of guests and rooms
  capacity.textContent = `${singleAd.offer.rooms} комнаты для ${singleAd.offer.guests} гостей`;

  //Generate time of checkin/checkout
  time.textContent = `Заезд после ${singleAd.offer.checkin}, выезд до ${singleAd.offer.checkout}`;

  //Generate features
  featureElements.forEach((feature) => {feature.remove();});
  featureElements[0].classList.remove('popup__feature--wifi');
  singleAd.offer.features.forEach((element) => {
    const elementTemplate = featureElements[0].cloneNode(true);
    elementTemplate.classList.add(`popup__feature--${element}`);
    features.appendChild(elementTemplate);
  });

  //Generate Desctription
  if (!singleAd.offer.description) {
    description.classList.add('hidden');
  }
  description.textContent = singleAd.offer.description;

  //Generate Photos of place
  photo.remove();
  if (!singleAd.offer.photos) {
    photos.classList.add('hidden');
  }
  singleAd.offer.photos.forEach((photoURL) => {
    const newPhoto = photo.cloneNode(true);
    newPhoto.src = photoURL;
    photos.appendChild(newPhoto);
  });

  adsListFragment.appendChild(adElement);
});

cardsList.appendChild(adsListFragment);
