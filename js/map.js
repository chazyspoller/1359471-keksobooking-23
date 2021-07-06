import {switchToActiveState, switchToInactiveState} from './form.js';
import {renderAds} from './data.js';
import {generateCard} from './cards.js';

const LAT_TOKYO = 35.6895;
const LNG_TOKYO = 139.69171;
const MAP_SCALE = 12;

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

//Map initialisation
const map = L.map('map-canvas')
  .on('load', () => {
    switchToActiveState();
    renderAds();
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
const pinsGroup = L.layerGroup().addTo(map);

const createAdPins = (ad) => {
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

const renderAdsOnMap = (ads, createPin) => {
  ads.forEach((ad) => {
    createPin(ad);
  });
};

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

export {renderAdsOnMap, createAdPins, resetFormFields};
