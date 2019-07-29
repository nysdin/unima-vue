<template>
    <div id="show">
        <p>{{ item.name }}</p>
        <router-link to="/">ホームへ戻る</router-link><br/>
        <router-link :to="`/sell/${this.$route.params.id}/edit`" v-if="seller">商品の編集</router-link>
        <el-button type="success" round @click="trade" v-if="!seller && open">購入手続き</el-button>
    </div>
</template>

<script>
import request from '../utils/api.js'

export default {
    name: 'productShow',
    data(){
        return {
            item: {}
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
        request.get(`/api/v1/products/${this.$route.params.id}`, {})
            .then( response => {
                console.log(response)
                this.item = response.data
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
        }
    }
}
</script>

