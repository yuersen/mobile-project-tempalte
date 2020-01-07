import { Toast } from 'vant';
import { login } from '@api/login';

const LOGIN = 'LOGIN';

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user')) || {}
  },
  mutations: {
    [LOGIN] (state, data) {
      const { token, user } = data;
      state.token = token;
      state.user = user;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
  },
  actions: {
    async login (state, data) {
      try {
        const res = await login({
          username: data.username,
          password: data.password
        });
        state.commit(LOGIN, res);
        /* eslint-disable */
        Toast({
          message: '登录成功',
          position: 'middle',
          duration: 2000
        });
        setTimeout(() => {
          const redirect = data.$route.query.redirect || '/';
          data.$router.replace({
            path: redirect
          });
        }, 3000);
      } catch (error) {}
    }
  },
  getters: {
    token (state) {
      return state.token;
    },
    user (state) {
      console.log('state', state);
      return state.user;
    }
  }
};