const adForm = document.querySelector('.ad-form');
const adFilters = document.querySelector('.map__filters');
const adTitleInput = adForm.querySelector('#title');
const adPriceInput = adForm.querySelector('#price');
const adRoomsSelect = adForm.querySelector('#room_number');
const adGuestsSelect = adForm.querySelector('#capacity');
const adTypeSeclect = adForm.querySelector('#type');
const adTimeInSelect = adForm.querySelector('#timein');
const adTimeOutSelect = adForm.querySelector('#timeout');

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
const RoomsGuestsConformance = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};
const TypePriceConformance = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

//Validation
const checkConformanceSeveralValues = (elementMain, elementCheck, conformanceList) => {
  for (const element of elementCheck.children) {
    element.disabled = true;
  }

  conformanceList[elementMain].forEach((element) => {
    elementCheck.querySelector(`option[value="${element}"]`).disabled = false;
    elementCheck.value = element;
  });
};

const setMinPrice = (type, priceField, conformanceList) => {
  priceField.setAttribute('min', conformanceList[type]);
  priceField.setAttribute('placeholder', conformanceList[type]);
  priceField.setCustomValidity(`Минимальное значение: ${conformanceList[type]}.`);
  priceField.reportValidity();
};

const setDefaultFormValues = () => {
  checkConformanceSeveralValues(adRoomsSelect.value, adGuestsSelect, RoomsGuestsConformance);
  setMinPrice(adTypeSeclect.value, adPriceInput, TypePriceConformance);
  adPriceInput.blur();
};

const setEqualTime = (timeOne, timeTwo) => {
  timeTwo.value = timeOne.value;
};

const checkValidityTitle = (evt) => {
  if (!evt.target.value) {
    evt.target.setCustomValidity('Заполните поле.');
    evt.target.style.color = '#FF8C00';
  } else if (evt.target.value.length < MIN_TITLE_LENGTH) {
    evt.target.setCustomValidity(`Минимальное количество символов: 30. Нужно добавить символов: ${MIN_TITLE_LENGTH - evt.target.value.length}.`);
    adTitleInput.style.color = '#FF8C00';
  } else if (evt.target.value.length > MAX_TITLE_LENGTH) {
    evt.target.setCustomValidity(`Нужно убрать символов: ${evt.target.value.length - MAX_TITLE_LENGTH}.`);
    evt.target.style.color = '#FF8C00';
  } else {
    evt.target.setCustomValidity('');
    evt.target.style.color = 'initial';
  }
  evt.target.reportValidity();
};

const checkValidityPrice = (evt) => {
  const validFieldValues = /^[0-9]{1,30}$/;
  if (!validFieldValues.test(evt.target.value)) {
    evt.target.setCustomValidity('Введите число.');
    evt.target.style.color = '#FF8C00';
  } else if (evt.target.value < +evt.target.getAttribute('min')) {
    evt.target.setCustomValidity(`Минимальное значение: ${evt.target.min}.`);
    evt.target.style.color = '#FF8C00';
  } else if (evt.target.value > MAX_PRICE) {
    evt.target.setCustomValidity(`Цена не должна превышать: ${MAX_PRICE.toLocaleString()}.`);
    evt.target.style.color = '#FF8C00';
  } else {
    evt.target.setCustomValidity('');
    evt.target.style.color = 'initial';
  }
  evt.target.reportValidity();
};

const checkValidityRooms = (evt) => {
  checkConformanceSeveralValues(adRoomsSelect.value, adGuestsSelect, RoomsGuestsConformance);
  evt.target.reportValidity();
};

const checkValidityTypes = () => {
  setMinPrice(adTypeSeclect.value, adPriceInput, TypePriceConformance);
};

const checkValidityTimeIn = () => {
  setEqualTime(adTimeInSelect, adTimeOutSelect);
};

const checkValidityTimeOut = () => {
  setEqualTime(adTimeOutSelect, adTimeInSelect);
};

const addFormListeners = () => {
  adTitleInput.addEventListener('input', checkValidityTitle);
  adPriceInput.addEventListener('input', checkValidityPrice);
  adRoomsSelect.addEventListener('input', checkValidityRooms);
  adTypeSeclect.addEventListener('input', checkValidityTypes);
  adTimeInSelect.addEventListener('input', checkValidityTimeIn);
  adTimeOutSelect.addEventListener('input', checkValidityTimeOut);
};

const removeFormListeners = () => {
  adTitleInput.removeEventListener('input', checkValidityTitle);
  adPriceInput.removeEventListener('input', checkValidityPrice);
  adRoomsSelect.removeEventListener('input', checkValidityRooms);
  adTypeSeclect.removeEventListener('input', checkValidityTypes);
  adTimeInSelect.removeEventListener('input', checkValidityTimeIn);
  adTimeOutSelect.removeEventListener('input', checkValidityTimeOut);
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
  setDefaultFormValues();
};

adForm.addEventListener('submit', () => {
  switchToInactiveState();
});

export {switchToActiveState};
