import {apiInstance, fileApiInstance, createHeaders} from '.';

const api = apiInstance();
const fileApi = fileApiInstance();

async function getUserInfoApi(success, fail) {
  await api
    .get('/api/me', {headers: await createHeaders()})
    .then(success)
    .catch(fail);
}

async function editMyProfileApi(newUserInfo, success, fail) {
  console.log('newUserInfo', newUserInfo);
  await fileApi
    // Body
    .put('/api/user', newUserInfo, {headers: await createHeaders()})
    .then(success)
    .catch(fail);
}

async function duplicateTestApi(nickname, success, fail) {
  await api
    .get(
      // QueryParams
      `/api/valid/${nickname}`,
      {params: {nickname: nickname}},
      {headers: await createHeaders()},
    )
    .then(success)
    .catch(fail);
}

async function getUserPointApi(success, fail) {
  await api
    .get('/api/quest/point', {headers: await createHeaders()})
    .then(success)
    .catch(fail);
}

export {getUserInfoApi, editMyProfileApi, duplicateTestApi, getUserPointApi};
