import {apiInstance, fileApiInstance} from '.';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

api.interceptors.response.use(
  res => res,
  async err => {
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

    const response = await api.post(REFRESH_URL);
    const accessToken = response.data.accessToken;
    const refreshToken = response.data.refreshToken;

    await AsyncStorage.setItem('accessToken', accessToken, () => {
      config.headers.Authorization = `Bearer ${accessToken}`;
    });
    await AsyncStorage.setItem('refreshToken', refreshToken);

    return api(config);
  },
);

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

    const response = await api.post(REFRESH_URL);
    const accessToken = response.data.accessToken;
    const refreshToken = response.data.refreshToken;

    await AsyncStorage.setItem('accessToken', accessToken, () => {
      config.headers.Authorization = `Bearer ${accessToken}`;
    });
    await AsyncStorage.setItem('refreshToken', refreshToken);

    return fileApi(config);
  },
);

async function getUserInfoApi(success, fail) {
  await api.get('/api/me').then(success).catch(fail);
}

async function editMyProfileApi(newUserInfo, success, fail) {
  await fileApi.put('/api/user', newUserInfo).then(success).catch(fail);
}

async function duplicateTestApi(nickname, success, fail) {
  await api
    .get(
      // QueryParams
      `/api/valid/${nickname}`,
      {params: {nickname: nickname}},
    )
    .then(success)
    .catch(fail);
}

async function getUserPointApi(success, fail) {
  await api.get('/api/quest/point').then(success).catch(fail);
}

async function getUserLog(success, fail) {
  await api.get('/api/mypage').then(success).catch(fail);
}

export {
  getUserInfoApi,
  editMyProfileApi,
  duplicateTestApi,
  getUserPointApi,
  getUserLog,
};
