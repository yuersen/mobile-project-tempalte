<template>
  <div class="home">
    <van-tabs>
      <van-tab v-for="nav in tabs" :key="nav" :title="nav">
        <h2>爱莲说</h2>
        <p>水陆草木之花，可爱者甚蕃。</p>
        <p>晋陶渊明独爱菊。</p>
        <p>自李唐来，世人甚爱牡丹。</p>
        <p>予独爱莲之出淤泥而不染，濯清涟而不妖，</p>
        <p>中通外直，不蔓不枝，香远益清，</p>
        <p>亭亭净植，可远观而不可亵玩焉。</p>
        <p>予谓菊，花之隐逸者也；</p>
        <p>牡丹，花之富贵者也；</p>
        <p>莲，花之君子者也。</p>
        <p>噫！菊之爱，陶后鲜有闻。</p>
        <p>莲之爱，同予者何人？</p>
        <p>牡丹之爱，宜乎众矣！</p>
      </van-tab>
    </van-tabs>
    <van-tabbar v-model="active">
      <van-tabbar-item replace to="/" icon="home-o">友商联盟</van-tabbar-item>
      <van-tabbar-item replace to="/" icon="friends-o">关于我们</van-tabbar-item>
      <van-tabbar-item replace to="/" icon="setting-o">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Vue from 'vue';
import { Tab, Tabs, Tabbar, TabbarItem } from 'vant';

Vue.use(Tab)
  .use(Tabs)
  .use(Tabbar)
  .use(TabbarItem);

export default {
  name: 'home',
  data () {
    return {
      tabs: ['普通话学习', '分级课程', '译学中文', '中文1000句', '中华经典朗读'],
      active: 0
    };
  }
};
</script>
<style scoped lang="scss">
.home {
  position: relative;
  height: 100%;

  &_content {
    height: calc(100% - 45px);
  }

  h2 {
    font-size: 16px;
  }

  p {
    padding: 0 10px;
    font-size: 14px;
  }
}
</style>