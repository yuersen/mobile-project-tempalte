import { post } from '@utils/http.js';

/**
 * Login api
 * @param  {Object} params 登录信息
 * @param  {String} params.userName 账户
 * @param  {String} params.password 密码
 * @return {Promise}
 */
export function login (params) {
  return post('/path/to/login', params);
}
