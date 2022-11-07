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

async function getSelectedFeed(feedId, success, fail) {
  await api
    .get(`/api/feed/all/${feedId}`, {headers: await createHeaders()})
    .then(success)
    .catch(fail);
}

async function setFeedLike(test, success, fail) {
  await api
    .post('/api/feed/like', {feedId: test}, {headers: await createHeaders()})
    .then(success)
    .catch(fail);
}
async function setFeedDisLike(test, success, fail) {
  await api
    .delete('/api/feed/like', {
      headers: await createHeaders(),
      data: {feedId: test},
    })
    .then(success)
    .catch(fail);
}

export {getAllFeeds, getSelectedFeed, setFeedLike, setFeedDisLike};
