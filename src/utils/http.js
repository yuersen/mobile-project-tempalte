import axios from 'axios';
import qs from 'qs';
import store from '@store/index';
import { Toast } from 'vant';

// 请求超时时间
axios.defaults.timeout = 12000;
axios.defaults.baseURL = process.env.VUE_APP_BASE_API;

// post请求头的设置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// axios 请求拦截器
axios.interceptors.request.use(
  config => {
    // 可在此设置要发送的token
    const token = store.getters['login/token'];
    token && (config.headers.token = token);

    // Indicator.open('数据加载中')
    return config;
  },
  error => {
    return Promise.error(error);
  }
);

// axios respone拦截器
axios.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误 结合自身业务和后台返回的接口状态约定写respone拦截器
    if (response.status === 200 && response.data.code === 0) {
      return Promise.resolve(response);
    } else {
      /* eslint-disable */
      Toast({
        message: response.data.msg,
        position: 'middle',
        duration: 2000
      });
      return Promise.reject(response);
    }
  },
  error => {
    const responseCode = error.response.status;
    switch (responseCode) {

      // 401：未登录
      case 401:
        break;

      // 404请求不存在
      case 404:
        /* eslint-disable */
        Toast({
          message: '网络请求不存在',
          position: 'middle',
          duration: 2000
        });
        break;
      default:
        /* eslint-disable */
        Toast({
          message: error.response.data.message,
          position: 'middle',
          duration: 2000
        });
    }

    return Promise.reject(error.response);
  }
);

/**
 * 封装 Get 方法，对应 Get 请求
 * @param {String} url 请求的url地址
 * @param {Object} params 请求时携带的参数
 */
function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * 封装 Post 方法，对应 Post 请求
 * @param {String} url 请求的url地址
 * @param {Object} params 请求时携带的参数
 */
function post (url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, qs.stringify(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export { get, post };