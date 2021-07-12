import {debounce} from './utils/debounce.js';
import {switchFormToActiveState, switchFiltersToActiveState, switchToInactiveState} from './form.js';
import {loadData} from './api.js';
import {generateCard} from './cards.js';
import {showMessage} from './util.js';
import {addFiltersSelectListeners, filtrationByType, filtrationByRooms, filtrationByGuests, filtrationByPrice, getAdsRankByFeatures} from './filters.js';

const LAT_TOKYO = 35.6895;
const LNG_TOKYO = 139.69171;
const MAP_SCALE = 12;
const URL_DOWNLOAD = 'https://23.javascript.pages.academy/keksobooking/data';
const MAX_ADS_SHOWN = 10;
const RERENDER_DELAY = 500;

const addressField = document.querySelector('#address');
const adForm = document.querySelector('.ad-form');
const adFilters = document.querySelector('.map__filters');
const adPriceInput = adForm.querySelector('#price');

switchToInactiveState();

const setValueToAddressField = (marker) => {
  const coordinates = marker.getLatLng();
  addressField.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
};

//Create pins
const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: LAT_TOKYO,
    lng: LNG_TOKYO,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const renderCallback = (ads) => debounce(() => renderAdsOnMap(ads), RERENDER_DELAY);

const renderTenAdsWithFilters = (ads) => {
  renderAdsOnMap(ads);
  switchFiltersToActiveState();
  addFiltersSelectListeners(renderCallback(ads));
};

//Map initialisation
const map = L.map('map-canvas')
  .on('load', () => {
    loadData(URL_DOWNLOAD, {method: 'GET'}, renderTenAdsWithFilters, showMessage);
    switchFormToActiveState();
    setValueToAddressField(mainMarker);
  })
  .setView({
    lat: LAT_TOKYO,
    lng: LNG_TOKYO,
  }, MAP_SCALE);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

//Add main pin to map
mainMarker.addTo(map);

//Set new coordinates of pin to address field
mainMarker.on('move', (evt) => {
  setValueToAddressField(evt.target);
});

//Show pins of temporary data
let pinsGroup = L.layerGroup().addTo(map);

const createAdPin = (ad) => {
  const adPin = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    shadowUrl: ad.author.avatar,
    shadowSize: [16, 16],
    shadowAnchor: [8, 34],
    popupAnchor:  [0, -35],
  });

  const markerAd = L.marker(
    {
      lat: ad.location.lat,
      lng: ad.location.lng,
    },
    {
      icon: adPin,
    },
  );
  markerAd.addTo(pinsGroup).bindPopup(
    generateCard(ad),
    {
      keepInView: true,
    },
  );
};

function renderAdsOnMap(ads) {
  map.removeLayer(pinsGroup);
  pinsGroup = L.layerGroup().addTo(map);

  ads
    .slice()
    .filter(filtrationByType)
    .filter(filtrationByRooms)
    .filter(filtrationByPrice)
    .filter(filtrationByGuests)
    .filter(getAdsRankByFeatures)
    .slice(0, MAX_ADS_SHOWN)
    .forEach(createAdPin);
}

//Clear ad form/filters form
const resetFormFields = () => {
  adForm.reset();
  adFilters.reset();
  adPriceInput.setAttribute('min', 1000);
  adPriceInput.setAttribute('placeholder', 1000);
  setValueToAddressField(mainMarker);

  mainMarker.setLatLng({
    lat: LAT_TOKYO,
    lng: LNG_TOKYO,
  });

  map.setView({
    lat: LAT_TOKYO,
    lng: LNG_TOKYO,
  }, MAP_SCALE);
};

export {renderAdsOnMap, resetFormFields, renderCallback};
