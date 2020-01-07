import Vue from 'vue';
import i18n from './locale/index';
import App from './App.vue';
import router from './router/index';
import store from './store/index';

import 'amfe-flexible/index.js';

Vue.config.productionTip = false;
Vue.config.devtools = true;

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app');