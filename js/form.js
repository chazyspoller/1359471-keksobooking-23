import {resetFormFields, filtersCallback} from './map.js';
import {loadData} from './api.js';
import {removeFiltersSelectListener} from './filters.js';

const URL_SEND = 'https://23.javascript.pages.academy/keksobooking';

const adForm = document.querySelector('.ad-form');
const adFilters = document.querySelector('.map__filters');
const adPriceInput = adForm.querySelector('#price');
const adRoomsSelect = adForm.querySelector('#room_number');
const adGuestsSelect = adForm.querySelector('#capacity');
const adTypeSeclect = adForm.querySelector('#type');
const adTimeInSelect = adForm.querySelector('#timein');
const adTimeOutSelect = adForm.querySelector('#timeout');
const clearBtn = document.querySelector('.ad-form__reset');
const modalSuccess = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const modalError = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const buttonClosePopup = modalError.querySelector('.error__button');

const RoomsGuestsMap = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
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
  if (RoomsGuestsMap[adRoomsSelect.value].indexOf(adGuestsSelect.value) === -1) {
    adGuestsSelect.setCustomValidity('Укажите допустимое количество гостей.');
  } else {
    adGuestsSelect.setCustomValidity('');
  }
};

const onRoomsSelect = () => {
  updateDependentValidValues(adRoomsSelect.value, adGuestsSelect, RoomsGuestsMap);
  onGuestsSelect();
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
const onEscKeyDownSuccess = onEscKeyDown.bind(this, modalSuccess);
const onEscKeyDownError = onEscKeyDown.bind(this, modalError);
const onClickSuccess = onModalClick.bind(this, modalSuccess);
const onClickError = onModalClick.bind(this, modalError);

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

const onSuccessSend = () => {
  openModalMessage(modalSuccess);
  resetFormFields();
};

const onErrorSend = () => {
  openModalMessage(modalError);
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  loadData(URL_SEND, {method: 'POST', body: formData}, onSuccessSend, onErrorSend);
};

//Form Listeners
const addFormListeners = () => {
  adRoomsSelect.addEventListener('input', onRoomsSelect);
  adGuestsSelect.addEventListener('change', onGuestsSelect);
  adTypeSeclect.addEventListener('input', onTypesSelect);
  adTimeInSelect.addEventListener('input', onTimeInSelect);
  adTimeOutSelect.addEventListener('input', onTimeOutSelect);
  adForm.addEventListener('submit', onFormSubmit);
  clearBtn.addEventListener('click', onClearFormBtnClick);
};

const removeFormListeners = () => {
  adRoomsSelect.removeEventListener('input', onRoomsSelect);
  adGuestsSelect.removeEventListener('change', onGuestsSelect);
  adTypeSeclect.removeEventListener('input', onTypesSelect);
  adTimeInSelect.removeEventListener('input', onTimeInSelect);
  adTimeOutSelect.removeEventListener('input', onTimeOutSelect);
  adForm.removeEventListener('submit', onFormSubmit);
  clearBtn.removeEventListener('click', onClearFormBtnClick);
  removeFiltersSelectListener(filtersCallback);
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

const switchFormToActiveState = () => {
  changeDisabledStatusOfElementWithChildren(adForm, 'ad-form--disabled', false, 'remove');
  addFormListeners();
};

const switchFiltersToActiveState = () => {
  changeDisabledStatusOfElementWithChildren(adFilters, 'map__filters--disabled', false, 'remove');
};

export {switchFormToActiveState, switchFiltersToActiveState, switchToInactiveState};
