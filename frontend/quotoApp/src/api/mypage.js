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
    // .put('/api/user', newUserInfo, {headers: await createHeaders()})
    // .put('/api/user', {
    //   params: {file: newUserInfo},
    //   headers: await createHeaders(),
    // })
    .put('/api/user', newUserInfo, {headers: await createHeaders()})
    .then(success)
    .catch(fail);
}

async function duplicateTestApi(nickname, success, fail) {
  await api
    .get(
      `/api/valid/${nickname}`,
      {params: {nickname: nickname}},
      {headers: await createHeaders()},
    )
    .then(success)
    .catch(fail);
}

export {getUserInfoApi, editMyProfileApi, duplicateTestApi};
