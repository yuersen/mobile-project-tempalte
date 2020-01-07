import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

export default new VueI18n({
  locale: localStorage.getItem('GCLP_LANGUAGE') || 'zh',
  messages: {
    'zh-CN': require('./zh-CN'),
    'en-US': require('./en-US')
  }
});