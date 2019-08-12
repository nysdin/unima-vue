<template>
  <div class="home">
    <v-container fluid grid-list-md>
      <v-layout wrap>
        <v-flex v-for="item in items" :key="item.id" xs4>
          <v-card flat class="product" @click="showProduct(item.id)">
            <v-img height="200px" 
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            ></v-img>
            <v-card-title>{{ item.name }}</v-card-title>
            <v-card-text>{{ item.price }}</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <template v-if="!loggedIn">
      <router-link to='/login'>ログイン</router-link>
      <router-link to='/register'>新規登録</router-link>
    </template>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  computed: {
    items(){
      return this.$store.state.product.products
    },
    loggedIn(){
      return this.$store.state.auth.token
    }
  },
  methods: {
    logout(){
      this.$store.dispatch('auth/logout', { auth: true })
        .then( () => {
          this.$router.push('/login')
        })
    },
    showProduct(id){
      this.$router.push({ path: `/product/${id}`})
    },
  },
  created(){
    this.$store.dispatch('product/setProducts')
  }
}
</script>

<style>
  .product{
    cursor: pointer;
  }

</style>

