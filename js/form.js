const adForm = document.querySelector('.ad-form');
const adFilters = document.querySelector('.map__filters');

const changeDisabledStatusOfElementWithChildren = (elementContainer, className, status, actionName) => {
  elementContainer.classList[actionName](className);
  for (const element of elementContainer.children) {
    element.disabled = status;
  }
};

const switchToInactiveState = () => {
  changeDisabledStatusOfElementWithChildren(adForm, 'ad-form--disabled', true, 'add');
  changeDisabledStatusOfElementWithChildren(adFilters, 'map__filters--disabled', true, 'add');
};

const switchToActiveState = () => {
  changeDisabledStatusOfElementWithChildren(adForm, 'ad-form--disabled', false, 'remove');
  changeDisabledStatusOfElementWithChildren(adFilters, 'map__filters--disabled', false, 'remove');
};

export {switchToInactiveState, switchToActiveState};
