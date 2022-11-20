import {apiInstance, createHeaders} from '.';

const api = apiInstance();

// 다른 사람 정보 조회
async function getOtherInfoApi(userId, success, fail) {
  await api
    .get(`/api/info/${userId}`, {headers: await createHeaders()})
    .then(success)
    .catch(fail);
}

// 다른 사람 퀘스트 로그 조회
async function getOtherLogApi(userId, success, fail) {
  await api
    .get(`/api/user/quest/${userId}`, {headers: await createHeaders()})
    .then(success)
    .catch(fail);
}

export {getOtherInfoApi, getOtherLogApi};
