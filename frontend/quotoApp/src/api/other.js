import {apiInstance, createHeaders} from '.';

const api = apiInstance();

// 다른 사람 정보 조회
async function getOtherInfoApi(userId, success, fail) {
  await api
    .get(
      `/api/info/${userId}`, {headers: await createHeaders()},
    )
    .then(success)
    .catch(fail);
}

export {getOtherInfoApi};
