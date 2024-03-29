import {resetFormFields} from './map.js';
import {loadData} from './api.js';
import {removeFiltersSelectListener} from './filters.js';
import {addLoadPhotoListeners, removeLoadPhotoListeners} from './upload-files.js';

const URL_SEND = 'https://23.javascript.pages.academy/keksobooking';

const adForm = document.querySelector('.ad-form');
const adPriceInput = adForm.querySelector('#price');
const adRoomsSelect = adForm.querySelector('#room_number');
const adGuestsSelect = adForm.querySelector('#capacity');
const adTypeSelect = adForm.querySelector('#type');
const adTimeInSelect = adForm.querySelector('#timein');
const adTimeOutSelect = adForm.querySelector('#timeout');
const clearBtn = document.querySelector('.ad-form__reset');
const modalSuccess = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const modalError = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const buttonClosePopup = modalError.querySelector('.error__button');

const roomsGuestsMap = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};
const typePriceMap = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

//Validation
const updateDependentValidValues = (valueToCheck, valueToChange, mapList) => {
  for (const value of valueToChange.children) {
    value.disabled = true;
  }

  mapList[valueToCheck].forEach((value) => {
    valueToChange.querySelector(`option[value="${value}"]`).disabled = false;
  });
};

const setMinPrice = (type, priceField, mapList) => {
  priceField.setAttribute('min', mapList[type]);
  priceField.setAttribute('placeholder', mapList[type]);
};

const setEqualTime = (timeOne, timeTwo) => {
  timeTwo.value = timeOne.value;
};

const onGuestsSelect = () => {
  if (roomsGuestsMap[adRoomsSelect.value].indexOf(adGuestsSelect.value) === -1) {
    adGuestsSelect.setCustomValidity('Укажите допустимое количество гостей.');
  } else {
    adGuestsSelect.setCustomValidity('');
  }
};

const onRoomsSelect = () => {
  updateDependentValidValues(adRoomsSelect.value, adGuestsSelect, roomsGuestsMap);
  onGuestsSelect();
};

const onTypeSelect = () => {
  setMinPrice(adTypeSelect.value, adPriceInput, typePriceMap);
};

const onTimeInSelect = () => {
  setEqualTime(adTimeInSelect, adTimeOutSelect);
};

const onTimeOutSelect = () => {
  setEqualTime(adTimeOutSelect, adTimeInSelect);
};

//Add a map cleaning function
const onClearFormBtnClick = (evt) => {
  evt.preventDefault();
  resetFormFields();
};

//Add message template
const addModal = (modal) => {
  document.body.appendChild(modal);
  modal.classList.add('hidden');
};

addModal(modalSuccess);
addModal(modalError);

//Submit Form and show a message
const onEscKeyDown = (modal, evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    closeModalMessage(modal);
  }
};

const onModalClick = (modal) => {
  closeModalMessage(modal);
};

//Variables for listeners functions
const onEscKeyDownSuccess = onEscKeyDown.bind(null, modalSuccess);
const onEscKeyDownError = onEscKeyDown.bind(null, modalError);
const onClickSuccess = onModalClick.bind(null, modalSuccess);
const onClickError = onModalClick.bind(null, modalError);

const openModalMessage = (modal) => {
  modal.classList.remove('hidden');
  document.addEventListener('keydown', modal === modalSuccess ? onEscKeyDownSuccess : onEscKeyDownError);
  document.addEventListener('click', modal === modalSuccess ? onClickSuccess : onClickError);
  if (modal.contains(buttonClosePopup)) {
    buttonClosePopup.addEventListener('click', modal === modalSuccess ? onClickSuccess : onClickError);
  }
};

function closeModalMessage(modal) {
  modal.classList.add('hidden');
  document.removeEventListener('keydown', modal === modalSuccess ? onEscKeyDownSuccess : onEscKeyDownError);
  document.removeEventListener('click', modal === modalSuccess ? onClickSuccess : onClickError);
  if (modal.contains(buttonClosePopup)) {
    buttonClosePopup.removeEventListener('click', modal === modalSuccess ? onClickSuccess : onClickError);
  }
}

const onDataSuccessSend = () => {
  openModalMessage(modalSuccess);
  resetFormFields();
};

const onDataErrorSend = () => {
  openModalMessage(modalError);
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  loadData(URL_SEND, {method: 'POST', body: formData}, onDataSuccessSend, onDataErrorSend);
};

//Form Listeners
const addFormListeners = () => {
  adRoomsSelect.addEventListener('input', onRoomsSelect);
  adGuestsSelect.addEventListener('change', onGuestsSelect);
  adTypeSelect.addEventListener('input', onTypeSelect);
  adTimeInSelect.addEventListener('input', onTimeInSelect);
  adTimeOutSelect.addEventListener('input', onTimeOutSelect);
  adForm.addEventListener('submit', onFormSubmit);
  clearBtn.addEventListener('click', onClearFormBtnClick);
  addLoadPhotoListeners();
};

const removeFormListeners = () => {
  adRoomsSelect.removeEventListener('input', onRoomsSelect);
  adGuestsSelect.removeEventListener('change', onGuestsSelect);
  adTypeSelect.removeEventListener('input', onTypeSelect);
  adTimeInSelect.removeEventListener('input', onTimeInSelect);
  adTimeOutSelect.removeEventListener('input', onTimeOutSelect);
  adForm.removeEventListener('submit', onFormSubmit);
  clearBtn.removeEventListener('click', onClearFormBtnClick);
  removeLoadPhotoListeners();
  removeFiltersSelectListener();
};

export {addFormListeners, removeFormListeners};
