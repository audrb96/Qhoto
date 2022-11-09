import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiInstance, fileApiInstance} from '.';

const api = apiInstance();
const fileApi = fileApiInstance();
const REFRESH_URL = '/api/auth/reissue';

api.interceptors.request.use(async config => {
  if (!config.headers) return config;

  let token = null;

  if (config.url === REFRESH_URL) {
    token = await AsyncStorage.getItem('refreshToken');
  } else {
    token = await AsyncStorage.getItem('accessToken');
  }

  if (token !== null) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// request interceptor
fileApi.interceptors.request.use(async config => {
  if (!config.headers) return config;

  let token = null;

  if (config.url === REFRESH_URL) {
    token = await AsyncStorage.getItem('refreshToken');
  } else {
    token = await AsyncStorage.getItem('accessToken');
  }

  if (token !== null) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// response interceptor
fileApi.interceptors.response.use(
  res => res,
  async err => {
    console.log(err.response);
    const {
      config,
      response: {
        data: {code},
      },
    } = err;

    /** 1 */
    if (config.url === REFRESH_URL || code !== 'U002' || config.sent) {
      return Promise.reject(err);
    }

    /** 2 */
    config.sent = true;

    const response = await api.post('/api/auth/reissue');
    const accessToken = response.data.accessToken;
    const refreshToken = response.data.refreshToken;

    await AsyncStorage.setItem('accessToken', accessToken, () => {
      config.headers.Authorization = `Bearer ${accessToken}`;
    });
    await AsyncStorage.setItem('refreshToken', refreshToken);

    return fileApi(config);
  },
);

async function getQuestList(success, fail) {
  await api.get(`/api/quest`).then(success).catch(fail);
}

async function uploadPhoto(feed, success, fail) {
  await fileApi.post(`/api/feed/upload/image`, feed).then(success).catch(fail);
}

async function uploadVideo(feed, success, fail) {
  await fileApi.post(`/api/feed/upload/video`, feed).then(success).catch(fail);
}

export {getQuestList, uploadPhoto, uploadVideo};
