<template>
    <div id="show">
        <p>{{ item.name }}</p>
        <router-link to="/">ホームへ戻る</router-link><br/>
        <router-link :to="`/sell/${this.$route.params.id}/edit`" v-if="seller">商品の編集</router-link>
        <el-button type="success" round @click="trade" v-if="!seller && open">購入手続き</el-button>
        <el-button plain @click="like" v-if="!liked">いいね</el-button>
        <el-button plain @click="unlike" v-if="liked">いいね取り消し</el-button>
        <el-button circle>{{ item.likes_count }}</el-button>
    </div>
</template>

<script>
import request from '../utils/api.js'

export default {
    name: 'productShow',
    data(){
        return {
            item: {},
            liked: false
        }
    },
    computed: {
        //ログイン中のユーザーの商品かどうか
        seller(){
            return this.$store.state.user.user.id === this.item.seller_id
        },
        open(){
            return this.item.status == "open"
        }
    },
    created(){
        //商品情報を取得
        request.get(`/api/v1/products/${this.$route.params.id}`, {auth: true})
            .then( response => {
                console.log(response)
                this.item = response.data.product
                this.liked = response.data.like
            })
            .catch( error => {
                console.log('error')
            })
    },
    methods: {
        trade(){
            request.post(`/api/v1/products/${this.item.id}/trade`, { auth: true })
                .then( response => console.log("success"))
                .catch( errors => console.log("error"))
        },
        like(){
            request.post(`/api/v1/products/${this.item.id}/likes`, { auth: true })
                .then(response => {
                    console.log(response.data)
                    this.item.likes_count = response.data.likes_count
                    this.liked = true
                })
                .catch(error => {
                    console.log('error')
                })
        },
        unlike(){
            request.delete(`/api/v1/products/${this.item.id}/likes`, { auth: true })
                .then( response => {
                    console.log(response.data)
                    this.item.likes_count = response.data.likes_count
                    this.liked = false
                })
                .catch(error => {
                    console.log('error')
                })
        }
    }
}
</script>

