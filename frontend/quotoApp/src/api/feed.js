import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiInstance} from '.';

const REFRESH_URL = '/api/auth/reissue';
const api = apiInstance();

// request interceptor
api.interceptors.request.use(async config => {
  if (!config.headers) {
    return config;
  }

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
api.interceptors.response.use(
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

    return api(config);
  },
);

async function getAllFeeds(params, success, fail) {
  await api
    .get('/api/feed/all', {
      params: {condition: params[1], duration: params[0]},
    })
    .then(success)
    .catch(fail);
}
async function getFriendsFeeds(duration, condition, success, fail) {
  await api
    .get('/api/feed/friend', {
      params: {duration, condition},
    })
    .then(success)
    .catch(fail);
}

async function getSelectedFeed(feedId, success, fail) {
  await api.get(`/api/feed/all/${feedId}`).then(success).catch(fail);
}

async function getCommentList(feedId, success, fail) {
  await api.get(`/api/feed/comment/${feedId}`).then(success).catch(fail);
}

async function setFeedLike(feedId, success, fail) {
  await api.post('/api/feed/like', {feedId}).then(success).catch(fail);
}
async function setFeedDislike(feedId, success, fail) {
  await api.delete(`/api/feed/like/${feedId}`).then(success).catch(fail);
}

async function setComment(feedId, commentContext, success, fail) {
  await api
    .post('/api/feed/comment', {feedId, commentContext})
    .then(success)
    .catch(fail);
}

async function setFeedMission(success, fail) {
  await api.get('/api/feed/option').then(success).catch(fail);
}

export {
  getAllFeeds,
  getSelectedFeed,
  getFriendsFeeds,
  getCommentList,
  setFeedLike,
  setFeedDislike,
  setComment,
  setFeedMission,
};
