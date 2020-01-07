<template>
  <div id="app" class="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" class="router"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" class="router"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    transitionName () {
      return this.$store.state.direction;
    }
  }
};
</script>
<style lang="scss">
html, body {
  height: 100%;
}
* {
  box-sizing: border-box;
}
.app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}
</style>