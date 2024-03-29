import {switchFormToActiveState, switchFiltersToActiveState, switchToInactiveState} from './page.js';
import {loadData} from './api.js';
import {generateCard} from './cards.js';
import {showMessage} from './util.js';
import {addFiltersSelectListener, filterByType, filterByRooms, filterByGuests, filterByPrice, filterByFeatures} from './filters.js';
import {resetPhotos} from './upload-files.js';

const LAT_TOKYO = 35.6895;
const LNG_TOKYO = 139.69171;
const MAP_SCALE = 12;
const URL_DOWNLOAD = 'https://23.javascript.pages.academy/keksobooking/data';
const MAX_ADS_SHOWN = 10;

const addressField = document.querySelector('#address');
const adForm = document.querySelector('.ad-form');
const adFilters = document.querySelector('.map__filters');
const adPriceInput = adForm.querySelector('#price');
let data;
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

const renderSeveralAdsWithFilters = (ads) => {
  data = renderAdsOnMap(ads);
  switchFiltersToActiveState();
  addFiltersSelectListener(ads);
};

//Map initialisation
const map = L.map('map-canvas')
  .on('load', () => {
    switchFormToActiveState();
    loadData(URL_DOWNLOAD, {method: 'GET'}, renderSeveralAdsWithFilters, showMessage);
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
  if (ads) {
    map.removeLayer(pinsGroup);
    pinsGroup = L.layerGroup().addTo(map);
    ads
      .slice()
      .filter(filterByType)
      .filter(filterByRooms)
      .filter(filterByPrice)
      .filter(filterByGuests)
      .filter(filterByFeatures)
      .slice(0, MAX_ADS_SHOWN)
      .forEach(createAdPin);
    return ads;
  }
}

//Clear ad form/filters form
const resetFormFields = () => {
  adForm.reset();
  adFilters.reset();
  adPriceInput.setAttribute('min', 1000);
  adPriceInput.setAttribute('placeholder', 1000);
  setValueToAddressField(mainMarker);
  renderAdsOnMap(data);
  resetPhotos();

  mainMarker.setLatLng({
    lat: LAT_TOKYO,
    lng: LNG_TOKYO,
  });

  map.setView({
    lat: LAT_TOKYO,
    lng: LNG_TOKYO,
  }, MAP_SCALE);
};

export {renderAdsOnMap, resetFormFields};
