<template>
  <div id="app">
    <div v-loading.fullscreen.lock="initLoading"
        element-loading-background="rgba(255, 255, 255, 1.0)"
    ></div>
    <router-view v-show="!initLoading"/>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return { initLoading: true}
  },
  computed: {
    loading(){
      return this.$store.getters['auth/authLoading']
    }
  },
  created(){
    if(localStorage.getItem('access-token')){
      console.log('created')
      this.$store.dispatch('auth/validateToken')
        .then( () => {
          this.initLoading = false
          this.$router.push('/')
        })
        .catch( () => {
          this.initLoading = false
          this.$router.push('/login')
        })
    }else{
      console.log('not acess-token created')
      this.initLoading = false
    }
  },
  methods: {

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
