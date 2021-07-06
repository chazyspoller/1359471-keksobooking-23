import {sendData} from './data.js';
import {resetFormFields} from './map.js';

const adForm = document.querySelector('.ad-form');
const adFilters = document.querySelector('.map__filters');
const adPriceInput = adForm.querySelector('#price');
const adRoomsSelect = adForm.querySelector('#room_number');
const adGuestsSelect = adForm.querySelector('#capacity');
const adTypeSeclect = adForm.querySelector('#type');
const adTimeInSelect = adForm.querySelector('#timein');
const adTimeOutSelect = adForm.querySelector('#timeout');
const modalSuccess = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const modalError = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const buttonClosePopup = modalError.querySelector('.error__button');

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
};

const setEqualTime = (timeOne, timeTwo) => {
  timeTwo.value = timeOne.value;
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

//Submit Form and show a message
const onKeyDownEsc = (modal, evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    // eslint-disable-next-line no-use-before-define
    closeModalMessage(modal);
  }
};

const onClickModal = (modal) => {
  // eslint-disable-next-line no-use-before-define
  closeModalMessage(modal);
};

const addModal = (modal) => {
  document.body.appendChild(modal);
  modal.classList.add('hidden');
};

const openModalMessage = (modal) => {
  modal.classList.remove('hidden');
  document.addEventListener('keydown', onKeyDownEsc.bind(this, modal));
  document.addEventListener('click', onClickModal.bind(this, modal));
  if (modal.contains(buttonClosePopup)) {
    buttonClosePopup.addEventListener('click', onClickModal.bind(this, modal));
  }
};

const closeModalMessage = (modal) => {
  modal.classList.add('hidden');
  document.removeEventListener('keydown', onKeyDownEsc.bind(this, modal));
  document.removeEventListener('click', onClickModal.bind(this, modal));
  if (modal.contains(buttonClosePopup)) {
    buttonClosePopup.removeEventListener('click', onClickModal.bind(this, modal));
  }
};

const onSuccessSend = () => {
  openModalMessage(modalSuccess);
  resetFormFields();
};

const onErrorSend = () => {
  openModalMessage(modalError);
};

const onSubmitForm = (evt) => {
  evt.preventDefault();
  addModal(modalSuccess);
  addModal(modalError);
  sendData(onSuccessSend, onErrorSend, evt);
};

//Form Listeners
const addFormListeners = () => {
  adRoomsSelect.addEventListener('input', onRoomsSelect);
  adTypeSeclect.addEventListener('input', onTypesSelect);
  adTimeInSelect.addEventListener('input', onTimeInSelect);
  adTimeOutSelect.addEventListener('input', onTimeOutSelect);
  adForm.addEventListener('submit', onSubmitForm);
};

const removeFormListeners = () => {
  adRoomsSelect.removeEventListener('input', onRoomsSelect);
  adTypeSeclect.removeEventListener('input', onTypesSelect);
  adTimeInSelect.removeEventListener('input', onTimeInSelect);
  adTimeOutSelect.removeEventListener('input', onTimeOutSelect);
  adForm.addEventListener('submit', onSubmitForm);
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

export {switchToActiveState, switchToInactiveState};
