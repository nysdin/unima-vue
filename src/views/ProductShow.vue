<template>
    <div id="show">
        <v-card :elevation="0" class="mb-4">
            <v-carousel :height="300" hide-delimiter-background delimiter-icon="mdi-minus" :touchless="true">
                <v-carousel-item v-for="(image, i) in item.images" :key="i">
                    <v-img :src="image.url" height="300"></v-img>
                </v-carousel-item>
            </v-carousel>
            <v-container class="pt-0">
                <v-card-title class="headline font-weight-medium py-2 px-0">{{ item.name }}</v-card-title>

                <div class="d-flex justify-space-between mb-2">
                    <div class="display-1">¥ {{ item.price }}</div>
                    <div>
                        <v-btn outlined rounded @click="like">
                            <v-icon left :color="favoriteColor">favorite</v-icon> いいね
                        </v-btn>
                        <span class="ml-3">{{ item.likes_count }}</span>
                    </div>
                </div>

                <v-btn color="error" block samll @click="trade" v-if="!seller && open">購入する</v-btn>
                <v-btn color="error" block samll v-if="seller && open"
                    @click="$router.push(`/sell/${$route.params.id}/edit`)" >
                    商品の編集
                </v-btn>
                <v-btn color="error" block samll v-if="(seller || buyer) && trading"
                    @click="$router.push(`/product/${$route.params.id}/trade`)">
                    取引画面
                </v-btn>
                <v-btn color="error" block samll @click="toEdit" v-if="soldOut" disabled>売り切れ</v-btn>

            </v-container>

            <v-sheet tile color="grey lighten-3 d-flex align-center" height="30">
                <p class="font-weight-bold py-0 pl-3 ma-0">商品の情報</p>
            </v-sheet>
            <v-simple-table>
                <tbody>
                    <tr>
                        <td>商品状態</td>
                        <td>{{ item.state }}</td>
                    </tr>
                    <tr>
                        <td>カテゴリー</td>
                        <td><v-breadcrumbs  class="px-0" :items="[{text: '一般'}, {text: '理系'}]" divider=">"></v-breadcrumbs></td>
                    </tr>
                </tbody>
            </v-simple-table>

            <v-sheet tile color="grey lighten-3 d-flex align-center" height="30">
                <p class="font-weight-bold py-0 pl-3 ma-0">商品の説明</p>
            </v-sheet>
            <v-sheet>
                <div class="pa-3">{{ item.description }}</div>
            </v-sheet>

            <v-sheet tile color="grey lighten-3 d-flex align-center" height="30">
                <p class="font-weight-bold py-0 pl-3 ma-0">出品者</p>
            </v-sheet>
            <v-list class="pa-0" flat>
                    <v-list-item @click="$router.push('/mypage')">
                        <v-list-item-avatar>
                            <v-img :src="item.seller.avatar.url"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.seller.name"></v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-icon>
                            <v-icon>mdi-chevron-right</v-icon>
                        </v-list-item-icon>
                    </v-list-item>
            </v-list>
        </v-card>

        <v-card :elevation="0">
            <v-container>
                <v-card :elevation="0" v-for="comment in comments" :key="comment.id">
                    <v-row>
                        <v-col :cols="2">
                            <v-avatar :size="40" class="mt-4">
                                <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar">
                            </v-avatar>
                        </v-col>
                        <v-col :cols="10" class="pl-0">
                            <p class="mb-1">{{ comment.user.name }}</p>
                            <v-sheet class="grey lighten-3 pa-2 comment">
                                {{ comment.content }}
                            </v-sheet>
                        </v-col>
                    </v-row>
                </v-card>
                <v-textarea v-model="content" outlined placeholder="分からないことなど質問しよう！"></v-textarea>
                <v-btn color="error" block samll @click="comment" :disabled="!open">コメントする</v-btn>
            </v-container>
        </v-card>
    </div>
</template>

<script>
import request from '../utils/api.js'

export default {
    name: 'productShow',
    data(){
        return {
            item: {
                seller: {
                    name: '',
                    avatar: { url: '' }
                }
            },
            liked: false,
            comments: [],
            content: '',
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
        },
        favoriteColor(){
            return this.liked ? 'red' : 'gray'
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
            if(this.liked){
                request.delete(`/api/v1/products/${this.item.id}/likes`, { auth: true })
                .then( response => {
                    console.log(response.data)
                    this.item.likes_count = response.data.likes_count
                    this.liked = false
                })
                .catch(error => {
                    console.log('error')
                })
            }else{
                request.post(`/api/v1/products/${this.item.id}/likes`, { auth: true })
                .then(response => {
                    console.log(response.data)
                    this.item.likes_count = response.data.likes_count
                    this.liked = true
                })
                .catch(error => {
                    console.log('error')
                })
            }
        },
        comment(){
            request.post(`/api/v1/products/${this.item.id}/comments`, { auth: true, params: { content: this.content} })
                .then( response => {
                    this.content = ''
                    this.comments.push(response.data.comments)
                })
                .catch(error => {
                    console.log('error')
                })
        },
        deleteComment(id, index){
            request.delete(`/api/v1/products/${this.item.id}/comments/${id}`, { auth: true })
                .then( response => {
                    this.comments.splice(index, 1)
                })
                .catch(error => {
                    console.log('error')
                })
        }
    }
}
</script>

<style>
    .product-toolbar{
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
    }

    .comment{
        border-radius: 10px;
    }

.comment:after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 3px; 
    left: -19px;
    border: 8px solid transparent;
    border-right: 18px solid #edf1ee;
    -webkit-transform: rotate(35deg);
    transform: rotate(35deg);
}
</style>

