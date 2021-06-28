import {switchToActiveState, switchToInactiveState} from './form.js';
import {createAds} from './temporary-data.js';
import {generateCard} from './cards.js';
switchToInactiveState();

const setOfAds = createAds();
const addressField = document.querySelector('#address');
const clearBtn = document.querySelector('.ad-form__reset');

const LAT_TOKYO = 35.6895;
const LNG_TOKYO = 139.69171;
const MAP_SCALE = 12;

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
mainMarker.on('moveend', (evt) => {
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

setOfAds.forEach((ad) => {
  createAdPins(ad);
});

//Add a map cleaning function
const onClearFormBtn = () => {
  mainMarker.setLatLng({
    lat: LAT_TOKYO,
    lng: LNG_TOKYO,
  });

  map.setView({
    lat: LAT_TOKYO,
    lng: LNG_TOKYO,
  }, MAP_SCALE);
};
clearBtn.addEventListener('click', onClearFormBtn);
