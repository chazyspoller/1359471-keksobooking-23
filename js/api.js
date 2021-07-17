const loadData = (url, options, onSuccess, onError) => {
  fetch(url, options)
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
