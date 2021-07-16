const PHOTO_WIDTH = '50';
const PHOTO_HEIGHT = '50';

const avatarField = document.querySelector('.ad-form-header__input');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photoHouseField = document.querySelector('.ad-form__input');
const photoHousePreviewBox = document.querySelector('.ad-form__photo');
const photoHousePreview = document.createElement('img');

const addImgElement = (imgElement) => {
  imgElement.setAttribute('src', '');
  imgElement.setAttribute('width', PHOTO_WIDTH);
  imgElement.setAttribute('height', PHOTO_HEIGHT);
  photoHousePreviewBox.style.display = 'flex';
  photoHousePreviewBox.style.justifyContent = 'center';
  photoHousePreviewBox.style.alignItems = 'center';
  photoHousePreviewBox.appendChild(imgElement);
  return imgElement;
};

const loadFile = (fileField, filePreview) => {
  const file = fileField.files[0];
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    filePreview.src = reader.result;
  });
  reader.readAsDataURL(file);
};

const onFileLoad = (evt) => {
  evt.target === avatarField ? loadFile(avatarField, avatarPreview): loadFile(photoHouseField, addImgElement(photoHousePreview));
};

const addLoadPhotoListeners = () => {
  avatarField.addEventListener('change', onFileLoad);
  photoHouseField.addEventListener('change', onFileLoad);
};

const removeLoadPhotoListeners = () => {
  avatarField.removeEventListener('change', onFileLoad);
  photoHouseField.removeEventListener('change', onFileLoad);
};

const resetPhotos = () => {
  avatarPreview.src = 'img/muffin-grey.svg';
  photoHousePreviewBox.innerHTML = '';
};

export {addLoadPhotoListeners, removeLoadPhotoListeners, resetPhotos};
