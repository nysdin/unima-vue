<template>
  <div class="home">
    <h1>Unima</h1>
    <el-button type="primary" plain @click="logout">Logout</el-button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  methods: {
    logout(){
      this.$store.dispatch('auth/logout', { auth: true, url: 'http://localhost:3000/api/v1/auth/sign_out' })
        .then( () => {
          this.$router.push('/login')
        })
    }
  }
}
</script>
