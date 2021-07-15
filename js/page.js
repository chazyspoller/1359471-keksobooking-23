import {addFormListeners, removeFormListeners} from './form.js';

const adForm = document.querySelector('.ad-form');
const adFilters = document.querySelector('.map__filters');

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
