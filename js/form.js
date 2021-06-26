const adForm = document.querySelector('.ad-form');
const adFilters = document.querySelector('.map__filters');
const adTitleInput = adForm.querySelector('#title');
const adPriceInput = adForm.querySelector('#price');
const adRoomsSelect = adForm.querySelector('#room_number');
const adGuestsSelect = adForm.querySelector('#capacity');
const adTypeSeclect = adForm.querySelector('#type');
const adTimeInSelect = adForm.querySelector('#timein');
const adTimeOutSelect = adForm.querySelector('#timeout');

const RoomsGuestsMap = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};
const TypePriceMap = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

//Validation
const updateDependentValidValues = (valueCheck, valueChange, mapList) => {
  for (const value of valueChange.children) {
    value.disabled = true;
  }

  mapList[valueCheck].forEach((value) => {
    valueChange.querySelector(`option[value="${value}"]`).disabled = false;
    valueChange.value = value;
  });
};

const setMinPrice = (type, priceField, mapList) => {
  priceField.setAttribute('min', mapList[type]);
  priceField.setAttribute('placeholder', mapList[type]);
  priceField.reportValidity();
};

const setEqualTime = (timeOne, timeTwo) => {
  timeTwo.value = timeOne.value;
};

const onTitleInput = (evt) => {
  evt.target.reportValidity();
};

const onPriceInput = (evt) => {
  evt.target.reportValidity();
};

const onRoomsSelect = () => {
  updateDependentValidValues(adRoomsSelect.value, adGuestsSelect, RoomsGuestsMap);
};

const onTypesSelect = () => {
  setMinPrice(adTypeSeclect.value, adPriceInput, TypePriceMap);
};

const onTimeInSelect = () => {
  setEqualTime(adTimeInSelect, adTimeOutSelect);
};

const onTimeOutSelect = () => {
  setEqualTime(adTimeOutSelect, adTimeInSelect);
};

const addFormListeners = () => {
  adTitleInput.addEventListener('input', onTitleInput);
  adPriceInput.addEventListener('input', onPriceInput);
  adRoomsSelect.addEventListener('input', onRoomsSelect);
  adTypeSeclect.addEventListener('input', onTypesSelect);
  adTimeInSelect.addEventListener('input', onTimeInSelect);
  adTimeOutSelect.addEventListener('input', onTimeOutSelect);
};

const removeFormListeners = () => {
  adTitleInput.removeEventListener('input', onTitleInput);
  adPriceInput.removeEventListener('input', onPriceInput);
  adRoomsSelect.removeEventListener('input', onRoomsSelect);
  adTypeSeclect.removeEventListener('input', onTypesSelect);
  adTimeInSelect.removeEventListener('input', onTimeInSelect);
  adTimeOutSelect.removeEventListener('input', onTimeOutSelect);
};

//Activation/Disactivation of form
const changeDisabledStatusOfElementWithChildren = (elementContainer, className, isDisabled, actionName) => {
  elementContainer.classList[actionName](className);
  for (const element of elementContainer.children) {
    element.disabled = isDisabled;
  }
};

const switchToInactiveState = () => {
  changeDisabledStatusOfElementWithChildren(adForm, 'ad-form--disabled', true, 'add');
  changeDisabledStatusOfElementWithChildren(adFilters, 'map__filters--disabled', true, 'add');
  removeFormListeners();
};

const switchToActiveState = () => {
  changeDisabledStatusOfElementWithChildren(adForm, 'ad-form--disabled', false, 'remove');
  changeDisabledStatusOfElementWithChildren(adFilters, 'map__filters--disabled', false, 'remove');
  addFormListeners();
};

adForm.addEventListener('submit', () => {
  switchToInactiveState();
});

export {switchToActiveState};
