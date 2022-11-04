import {apiInstance, createHeaders} from '.';

const api = apiInstance();

async function getUserInfo(success, fail) {
  await api
    .get('/api/me', {headers: await createHeaders()})
    .then(success)
    .catch(fail);
}

export {getUserInfo};
