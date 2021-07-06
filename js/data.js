import {renderAdsOnMap, createAdPins} from './map.js';
import {showMessage} from './util.js';

const renderAds = () => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((ads) => {
      renderAdsOnMap(ads, createAdPins);
    })
    .catch((err) => {
      showMessage(err);
    });
};

const sendData = (onSuccess, onError, data) => {
  const formData = new FormData(data.target);

  fetch('https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: formData,
    })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    });
};

export {renderAds, sendData};
