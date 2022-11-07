import {apiInstance, createHeaders} from '.';

const api = apiInstance();

async function getUserInfoApi(success, fail) {
  await api
    .get('/api/me', {headers: await createHeaders()})
    .then(success)
    .catch(fail);
}

export {getUserInfoApi};
