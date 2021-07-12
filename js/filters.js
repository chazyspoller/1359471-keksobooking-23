const typeFilterField = document.querySelector('#housing-type');
const priceFilterField = document.querySelector('#housing-price');
const roomsFilterField = document.querySelector('#housing-rooms');
const guestsFilterField = document.querySelector('#housing-guests');
const featuresFilterField = document.querySelectorAll('.map__checkbox');

const filtrationByType = (ad) => {
  const typeFilter = ad.offer.type;
  return (typeFilterField.value === 'any')? true: (typeFilterField.value === typeFilter);
};

const filtrationByRooms = (ad) => {
  const roomsFilter = ad.offer.rooms;
  return (roomsFilterField.value === 'any')? true: (Number(roomsFilterField.value) === roomsFilter);
};

const filtrationByGuests = (ad) => {
  const guestsFilter = ad.offer.guests;
  return (guestsFilterField.value === 'any')? true: (Number(guestsFilterField.value) === guestsFilter);
};

const getPriceType = (price) => {
  if (price < 10000) {
    return 'low';
  } else if (price >= 10000  && price < 50000) {
    return 'middle';
  } else {
    return 'high';
  }
};

const filtrationByPrice = (ad) => {
  const priceFilter = ad.offer.price;
  return (priceFilterField.value === 'any')? true: (priceFilterField.value === getPriceType(priceFilter));
};

const getAdsRankByFeatures = (ad) => {
  const arr = Array.from(featuresFilterField);
  const featuresFilter = ad.offer.features;
  const userFeatures = arr.filter((feature) => feature.checked);
  if (userFeatures.length === 0) {return true;}
  if(featuresFilter) {
    return userFeatures.every((feature) => featuresFilter.includes(feature.value));
  }
};

const addFiltersSelectListeners = (callback) => {
  typeFilterField.addEventListener('input', callback);
  priceFilterField.addEventListener('input', callback);
  roomsFilterField.addEventListener('input', callback);
  guestsFilterField.addEventListener('input', callback);
  featuresFilterField.forEach((feature) => {
    feature.addEventListener('input', callback);
  });
};

const removeFiltersSelectListeners = (callback) => {
  typeFilterField.removeEventListener('input', callback);
  priceFilterField.removeEventListener('input', callback);
  roomsFilterField.removeEventListener('input', callback);
  guestsFilterField.removeEventListener('input', callback);
  featuresFilterField.forEach((feature) => {
    feature.removeEventListener('input', callback);
  });
};

export {addFiltersSelectListeners, removeFiltersSelectListeners, filtrationByType, filtrationByRooms, filtrationByGuests, filtrationByPrice, getAdsRankByFeatures};
