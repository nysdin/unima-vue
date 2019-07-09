<template>
  <div id="app">
    <el-form label-position="right" label-width="100px" :model="user">
      <el-form-item label="Email">
        <el-input v-model="user.email"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="user.password"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" plain @click="login">Login</el-button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      }
    };
  },
  created(){
    
  },
  methods: {
    login(){
      
    }
  }
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
