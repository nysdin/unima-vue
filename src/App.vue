<template>
  <div id="app">
    <div v-loading.fullscreen.lock="!initLoading"
        element-loading-background="rgba(255, 255, 255, 1.0)"
    ></div>
    <router-view v-show="initLoading"/>
  </div>
</template>

<script>

export default {
  computed: {
    initLoading(){
      return this.$store.getters['auth/init']
    }
  },
  created(){
    this.$store.dispatch('auth/initialize', localStorage.getItem('access-token'))
  },
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
