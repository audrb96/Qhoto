import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// axios 객체 생성
function apiInstance() {
  const instance = axios.create({
    baseURL: 'https://qhoto-api.com',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return instance;
}

function fileApiInstance() {
  const instance = axios.create({
    baseURL: 'https://qhoto-api.com',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return instance;
}

const createHeaders = async () => {
  const accessToken = await AsyncStorage.getItem('accessToken')

    .then(token => {
      console.log(token);
      return {Authorization: `Bearer ${token}`};
    })
    .catch(err => console.log(err));
  return accessToken;
};

export {apiInstance, fileApiInstance, createHeaders};
