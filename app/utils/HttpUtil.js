const HOST = 'http://eat.ichancer.cn/';

export const request = (url, method, body) => {
  let isOk;
  return new Promise((resolve, reject) => {
    fetch(HOST + url, {
      method,
      body
    })
      .then((response) => {
        if (response.ok) {
          isOk = true;
        } else {
          isOk = false;
        }
        return response.json();
      })
      .then((responseData) => {
        if (isOk) {
          resolve(responseData);
        } else {
          reject(responseData);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
