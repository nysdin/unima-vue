<template>
    <div id="sell">
        <h1>商品編集</h1>
        <el-form label-position="right" label-width="100px" :model="product">
            <el-form-item label="商品名">
                <el-input v-model="product.name"></el-input>
            </el-form-item>
            <el-form-item label="商品説明">
                <el-input v-model="product.description"></el-input>
            </el-form-item>
            <el-form-item label="カテゴリー">
                <el-select v-model="product.category" placeholder="please select category">
                    <el-option v-for="category in categoris"
                                :key="category" :label="category" :value="category">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="使用状態">
                <el-select v-model="product.state" placeholder="please select state">
                    <el-option v-for="state in states"
                                :key="state.value" :label="state.label" :value="state.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="価格">
                <el-input v-model="product.price"></el-input>
            </el-form-item>
        </el-form>
        <el-button type="primary" plain @click="update">編集</el-button>
        <el-button type="danger" plain @click="destroy">削除</el-button>
        <router-link to="/">ホームへ戻る</router-link>
    </div>
</template>

<script>
import request from '../utils/api.js'

export default {
    name: 'sell',
    data(){
        return{
            product: {},
            categoris: ['general', 'humanity', 'science'],
            states: [
                {value: 'new', label: '新品、未使用'},
                {value: 'almost_new', label: '目立った傷や汚れなし'},
                {value: 'almost_old', label: 'やや傷れや汚れあり'},
                {value: 'old', label: '全体的に状態が悪い'}
            ]
        }
    },
    methods: {
        update(){
            request.patch(`/api/v1/products/${this.$route.params.id}`, { params: this.product, auth: true})
                .then( response => {
                    this.$router.push({ path: `/product/${response.data.id}` })
                })
                .catch( error => {
                    console.log('error')
                })
        },
        destroy(){
            request.delete(`/api/v1/products/${this.$route.params.id}`, { params: this.product, auth: true })
                .then( () => {
                    this.$router.push({ path: '/' })
                })
                .catch( () => {
                    console.log('error')
                })
        }
    },
    created(){
        this.$store.commit('auth/apiRequest')
        request.get(`/api/v1/products/${this.$route.params.id}`, {})
            .then( response => {
                if(this.$store.state.user.user.id === response.data.user_id){
                    console.log(response.data)
                    this.product = response.data
                    this.$store.commit('auth/apiCompleted')
                }else{
                    this.$router.push('/')
                    this.$store.commit('auth/apiCompleted')
                }
            })
    }
}
</script>