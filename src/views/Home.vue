<template>
  <div class="home">
    <v-container fluid>
      <v-row dense>
        <v-col :cols="4" v-for="product in products" :key="product.id">
          <v-card flat class="product" @click="showProduct(product.id)">
            <v-img  aspect-ratio="1"
              :src="product.images[0].url"
            ></v-img>
            <v-card-title class="pa-0 title font-weight-regular">{{ product.name }}</v-card-title>
            <div class="d-flex justify-space-between">
              <div class="pa-0 font-weight-light subtitle-1">¥ {{ product.price }}</div>
              <div>
                <v-icon :size="16" color="red" v-if="product.likes_count">favorite</v-icon>
                <span class="ml-1">{{ product.likes_count }}</span>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import request from '../utils/api.js'

export default {
  name: 'home',
  data(){
    return {
      products: []
    }
  },
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
    this.$store.commit('auth/apiRequest')
    request.get('/api/v1/products', {})
      .then( response => {
        console.log(response)
        this.products = response.data
        this.$store.commit('auth/apiCompleted')
      })
  }
}
</script>

<style>
  .product{
    cursor: pointer;
  }

</style>

