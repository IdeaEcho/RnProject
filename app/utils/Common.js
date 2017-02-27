'use strict';

let HOST= 'http://eat.ichancer.cn/index.php/';

export function requestData(url,method,body){
  return new Promise((resolve, reject) => {
    fetch(HOST + url, {
        headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/x-www-form-urlencoded',
          },
        method: method,
        body: body,
      })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
          resolve(responseData);
      })
      .catch((error) => {
          reject(error);
      });
  })
}

export function request(url, method, body) {
  var isOk;
  return new Promise((resolve, reject) => {
    fetch(HOST + url, {
        method: method,
        body: body,
      })
      .then((response) => {
        if (!response.error) {
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
  })
}
