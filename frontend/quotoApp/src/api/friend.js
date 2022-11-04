import {apiInstance, createHeaders} from '.';

const api = apiInstance();

// 친구검색(친구조회 = 유저검색)
async function findFriendApi(success, fail) {
  await api
    .get('/api/me', {headers: await createHeaders()})
    .then(success)
    .catch(fail);
}

// 친구목록
async function friendListApi(success, fail) {
  console.log('되냐');
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

export {findFriendApi, friendListApi, receiveListApi};
