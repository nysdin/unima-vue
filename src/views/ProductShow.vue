<template>
    <div id="show">
        <p>{{ item.name }}</p>
        <p>出品者 {{ item.seller.name }}</p>
        <router-link to="/">ホームへ戻る</router-link><br/>
        <router-link :to="`/sell/${this.$route.params.id}/edit`" v-if="seller">商品の編集</router-link>
        <router-link :to="`/product/${this.$route.params.id}/trade`" v-if="(seller || buyer) && trading">取引画面へ</router-link><br>
        <el-button type="success" round @click="trade" v-if="!seller && open">購入手続き</el-button>
        <el-button type="success" round disabled v-if="soldOut">売り切れ商品</el-button><br>
        <el-button plain @click="like" v-if="!liked">いいね</el-button>
        <el-button plain @click="unlike" v-if="liked">いいね取り消し</el-button>
        <el-button circle>{{ item.likes_count }}</el-button>

        <el-card class="box-card">
            <p style="text-align: left;" v-for="comment in comments" :key="comment.id">
                <span style="margin-right: 10px;">{{ comment.user.name }}</span>
                {{ comment.content }}
            </p>
        </el-card>
        <el-input type="textarea" :rows="2" placeholder="Please input" v-model="content">
        </el-input>
        <el-button plain @click="comment">コメント</el-button>
    </div>
</template>

<script>
import request from '../utils/api.js'

export default {
    name: 'productShow',
    data(){
        return {
            item: {
                seller: ''
            },
            liked: false,
            content: '',
            comments: []
        }
    },
    computed: {
        //ログイン中のユーザーの出品商品かどうか
        seller(){
            return this.$store.state.user.user.id === this.item.seller_id
        },
        //ログイン中のユーザーの購入商品かどうか
        buyer(){
            return this.$store.state.user.user.id == this.item.buyer_id
        },
        open(){
            return this.item.status == "open"
        },
        //取引中かどうか
        trading(){
            return this.item.status == "trade"
        },
        //取引終了している商品かどうか
        soldOut(){
            return this.item.status == "close"
        }
    },
    created(){
        //商品情報を取得
        request.get(`/api/v1/products/${this.$route.params.id}`, {auth: true})
            .then( response => {
                console.log(response)
                this.item = response.data.product
                this.liked = response.data.like
                this.comments = response.data.comments
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
        },
        comment(){
            request.post(`/api/v1/products/${this.item.id}/comments`, { auth: true, params: { content: this.content} })
                .then( response => {
                    this.comments.push(response.data.comments)
                })
                .catch(error => {
                    console.log('error')
                })
        }
    }
}
</script>

