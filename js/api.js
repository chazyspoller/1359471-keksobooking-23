const getMethod = (data) => data? {method: 'POST', body: data}: {method: 'GET'};

const loadData = (url, method, onSuccess, onError) => {
  fetch(url, method)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw Error;
    })
    .then((response) => response.json())
    .then((ad) => {
      onSuccess(ad);
    })
    .catch(() => {
      onError();
    });
};

export {loadData, getMethod};
