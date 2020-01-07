<template>
	<section class="login">
		<div class="login_form">
			<van-cell-group>
				<van-field
					v-model="username"
					required
					clearable
					:label="$t('login.userName')"
					:placeholder="$t('login.userNamePlaceHolder')"
				/>
				<van-field
					v-model="password"
					type="password"
					:label="$t('login.password')"
					:placeholder="$t('login.passwordPlaceHolder')"
					required
				/>
			</van-cell-group>
			<div class="login_submit">
				<van-button type="primary" size="large" @click="submit">{{ $t('login.submitBtnText') }}</van-button>
				<a class="login_locale" href="javascript:;" @click="switchLang">切换语言</a>
			</div>
		</div>
	</section>
</template>

<script>
import Vue from 'vue';
import { Cell, CellGroup, Field, Button } from 'vant';

Vue.use(Cell)
  .use(CellGroup)
  .use(Field)
  .use(Button);

export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    submit () {
      this.$router.push('home');
    },
    switchLang () {
      const local = localStorage.getItem('GCLP_LOCALE') || 'zh-CN';
      const lang = local === 'zh-CN' ? 'en-US' : 'zh-CN';
      this.$i18n.locale = lang;
      localStorage.setItem('GCLP_LOCALE', lang);
    }
  }
};
</script>
<style scoped lang="scss">
.login {
	position: relative;
	height: 100%;
	background: linear-gradient(to top, #e7eab8, #eaf5e9);

	&_form {
		position: absolute;
		top: 20%;
		padding: 10px;
		width: 100%;
	}

	&_submit {
		margin: 10px 0;
	}

	&_locale {
		display: inline-block;
		padding: 10px;
		font-size: 12px;
	}
}
</style>