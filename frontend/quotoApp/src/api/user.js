import {apiInstance} from '.';

const api = apiInstance();

async function loginGoogle(idToken, success, fail) {
  await api.post(`/api/login/google`, {idToken}).then(success).catch(fail);
}

async function loginKakao(accessToken, success, fail) {
  await api.post(`/api/login/kakao`, {accessToken}).then(success).catch(fail);
}

export {loginGoogle, loginKakao};
