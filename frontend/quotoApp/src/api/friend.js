import {apiInstance, createHeaders} from '.';
import AsyncStorage from '@react-native-async-storage/async-storage';

const REFRESH_URL = '/api/auth/reissue';
const api = apiInstance();

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

// 친구검색(친구조회 = 유저검색)
async function findFriendApi(nickname, success, fail) {
  await api
    // path variable
    .get(`/api/friend/find/${nickname}`)
    .then(success)
    .catch(fail);
}

// 친구요청(친구요청 + 요청수락)
async function addFriendApi(resUserId, success, fail) {
  await api
    // request Body
    .post('/api/friend', resUserId)
    .then(success)
    .catch(fail);
}

// 친구삭제(친구삭제 + 요청취소)
async function disconnectFriendApi(resUserId, success, fail) {
  await api
    // path variable
    .post(`/api/friend/disconnect/${resUserId}`)
    .then(success)
    .catch(fail);
}

// 친구목록
async function friendListApi(success, fail) {
  await api.get('/api/friend').then(success).catch(fail);
}

// 친구요청받은거 목록
async function receiveListApi(success, fail) {
  await api.get('/api/friend/receive').then(success).catch(fail);
}

// 연락처 접근
async function getContactsApi(data, success, fail) {
  console.log('data', data);
  await api.post('/api/contact', data).then(success).catch(fail);
}

export {
  findFriendApi,
  addFriendApi,
  friendListApi,
  receiveListApi,
  getContactsApi,
  disconnectFriendApi,
};
