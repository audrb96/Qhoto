import axios from 'axios';

// axios 객체 생성
function apiInstance() {
  const instance = axios.create({
    baseURL: 'https://qhoto-api.shop',
    headers: {
      'Content-type': 'application/json',
    },
  });
  return instance;
}

function fileApiInstance() {
  const instance = axios.create({
    baseURL: 'https://qhoto-api.shop',
    headers: {
      'Content-Type': `multipart/form-data`,
    },
  });
  return instance;
}

export {apiInstance, fileApiInstance};
