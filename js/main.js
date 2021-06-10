import {createAd, NUMBER_OF_ADS} from './temporary-data.js';

const setOfAds = [];

for (let index = 0; index < NUMBER_OF_ADS; index++) {
  setOfAds[index] = createAd(index + 1);
}
