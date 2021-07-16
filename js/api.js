const loadData = (url, settings, onSuccess, onError) => {
  fetch(url, settings)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw Error;
    })
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onError();
    });
};

export {loadData};
