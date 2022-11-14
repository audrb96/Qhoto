import {apiInstance, createHeaders} from '.';

const api = apiInstance();

// 친구검색(친구조회 = 유저검색)
async function findFriendApi(nickname, success, fail) {
  await api
    // path variable
    .get(`/api/friend/find/${nickname}`, {headers: await createHeaders()})
    .then(success)
    .catch(fail);
}

// 친구요청(친구요청 + 요청수락)
async function addFriendApi(resUserId, success, fail) {
  await api
    .post('/api/friend', resUserId, {headers: await createHeaders()})
    .then(success)
    .catch(fail);
}

// 친구목록
async function friendListApi(success, fail) {
  await api
    .get('/api/friend', {headers: await createHeaders()})
    .then(success)
    .catch(fail);
}

// 친구요청받은거
async function receiveListApi(success, fail) {
  await api
    .get('/api/friend/receive', {headers: await createHeaders()})
    .then(success)
    .catch(fail);
}

// 연락처 접근
async function getContactsApi(data, success, fail) {
  console.log('data', data)
  await api
    .post('/api/contact', data, {headers: await createHeaders()})
    .then(success)
    .catch(fail);
}

export {
  findFriendApi,
  addFriendApi,
  friendListApi,
  receiveListApi,
  getContactsApi,
};
