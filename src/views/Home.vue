<template>
  <div class="home">
    <h1>Unima</h1>
    <router-link to='/sell'>出品</router-link>
    <el-button type="primary" plain @click="logout">Logout</el-button>
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in items" :key="item.id">
        <el-card :body-style="{ padding: '0px' }" @click.native="showProduct(item.id)">
          <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
          <div style="padding: 14px;">
            <span>{{ item.name }}</span>
            <div class="bottom clearfix">
              <p>{{ item.description }}</p>
              <p>{{ item.price }}</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  computed: {
    items(){
      return this.$store.state.product.products
    }
  },
  methods: {
    logout(){
      this.$store.dispatch('auth/logout', { auth: true, url: 'http://localhost:3000/api/v1/auth/sign_out' })
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
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>

