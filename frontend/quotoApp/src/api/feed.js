import {apiInstance, createHeaders} from '.';

const api = apiInstance();

async function getAllFeeds(params, success, fail) {
  await api
    .get('/api/feed/all', {
      params: {condition: params[1], duration: params[0]},
      headers: await createHeaders(),
    })
    .then(success)
    .catch(fail);
}
async function getFriendsFeeds(params, success, fail) {
  await api
    .get('/api/feed/friend', {
      params: {condition: params[1], duration: params[0]},
      headers: await createHeaders(),
    })
    .then(success)
    .catch(fail);
}

async function getSelectedFeed(feedId, success, fail) {
  await api
    .get(`/api/feed/all/${feedId}`, {headers: await createHeaders()})
    .then(success)
    .catch(fail);
}

async function setFeedLike(Id, success, fail) {
  await api
    .post('/api/feed/like', {feedId: Id}, {headers: await createHeaders()})
    .then(success)
    .catch(fail);
}
async function setFeedDisLike(Id, success, fail) {
  await api
    .delete('/api/feed/like', {
      headers: await createHeaders(),
      data: {feedId: Id},
    })
    .then(success)
    .catch(fail);
}

async function setComment(params, success, fail) {
  await api
    .post(
      '/api/feed/comment',
      {feedId: params[0], commentContext: params[1]},
      {
        headers: await createHeaders(),
      },
    )
    .then(success)
    .catch(fail);
}

async function setFeedMission(success, fail) {
  await api
    .get('/api/feed/option', {
      headers: await createHeaders(),
    })
    .then(success)
    .catch(fail);
}

export {
  getAllFeeds,
  getSelectedFeed,
  getFriendsFeeds,
  setFeedLike,
  setFeedDisLike,
  setComment,
  setFeedMission,
};
