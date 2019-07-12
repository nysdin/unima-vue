<template>
  <div id="app">
    <div v-loading.fullscreen.lock="loading"
        element-loading-background="rgba(255, 255, 255, 1.0)"
    ></div>
    <router-view v-show="!loading"/>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  computed: {
    loading(){
      return true
    }
  },
  created(){
    if(localStorage.getItem('access-token')){
      console.log('created')
      this.$store.dispatch('auth/validateToken')
        .then( () => {
          this.$router.push('/')
        })
        .catch( () => {
          this.$router.push('/login')
        })
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
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
