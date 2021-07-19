import {debounce} from './util.js';
import {renderAdsOnMap} from './map.js';

const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;

const priceTypes = {
  low: 'low',
  middle: 'middle',
  high: 'high',
};

const filtersForm = document.querySelector('.map__filters');
const typeFilterField = document.querySelector('#housing-type');
const priceFilterField = document.querySelector('#housing-price');
const roomsFilterField = document.querySelector('#housing-rooms');
const guestsFilterField = document.querySelector('#housing-guests');
const featuresFilterField = document.querySelectorAll('.map__checkbox');
let onFiltersChange;

const getPriceType = (price) => {
  if (price < LOW_PRICE) {
    return priceTypes.low;
  } else if (price >= LOW_PRICE  && price < HIGH_PRICE) {
    return priceTypes.middle;
  } else {
    return priceTypes.high;
  }
};

const filterByElement = (ad, elementFilterField, element, transformFunc) => {
  const elementFilter = ad.offer[element];
  return (elementFilterField.value === 'any') ? true : (elementFilterField.value === transformFunc(elementFilter));
};

const filterByType = (ad) => filterByElement(ad, typeFilterField, 'type', String);

const filterByRooms = (ad) => filterByElement(ad, roomsFilterField, 'rooms', String);

const filterByGuests = (ad) => filterByElement(ad, guestsFilterField, 'guests', String);

const filterByPrice = (ad) => filterByElement(ad, priceFilterField, 'price', getPriceType);

const filterByFeatures = (ad) => {
  const featuresFilters = Array.from(featuresFilterField);
  const adFeatures = ad.offer.features;
  const userFeatures = featuresFilters.filter((feature) => feature.checked);
  if (userFeatures.length === 0) {
    return true;
  }
  if(adFeatures) {
    return userFeatures.every((feature) => adFeatures.includes(feature.value));
  }
};

const renderFiltersCallback = debounce(renderAdsOnMap);

const addFiltersSelectListener = (ads) => {
  onFiltersChange = () => renderFiltersCallback(ads);
  filtersForm.addEventListener('change', onFiltersChange);
};

const removeFiltersSelectListener = () => {
  filtersForm.removeEventListener('change', onFiltersChange);
};

export {addFiltersSelectListener, removeFiltersSelectListener, filterByType, filterByRooms, filterByGuests, filterByPrice, filterByFeatures};
