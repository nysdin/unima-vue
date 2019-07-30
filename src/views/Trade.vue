<template>
    <div id="trading">
        <p>{{ item.name }}</p>
        <el-button plain @click="finish">取引終了</el-button>
        <router-link to="/">ホームへ戻る</router-link><br/>
    </div>
</template>

<script>
import request from '../utils/api.js'

export default {
    name: 'Trade',
    data(){
        return {
            item: {},
        }
    },
    computed: {
    },
    created(){
        //商品情報を取得
        console.log('strat creation')
        this.$store.commit('auth/apiRequest')
        request.get(`/api/v1/products/${this.$route.params.id}`, { auth: true })
            .then( response => {
                console.log(response)
                this.$store.commit('auth/apiCompleted')
                this.item = response.data.product
                this.liked = response.data.like
            })
            .catch( error => {
                console.log('error')
            })
    },
    methods: {
        finish(){
            request.post(`/api/v1/products/${this.item.id}/complete`, { auth: true })
                .then( response => { console.log('finish')})
                .catch( error => {
                    console.log('error')
                })
        }
    }
}
</script>
