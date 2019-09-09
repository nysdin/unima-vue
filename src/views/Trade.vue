<template>
    <div id="show">
        <v-card :elevation="0" class="mb-4">
            <v-carousel :height="300" hide-delimiter-background delimiter-icon="mdi-minus" :touchless="true">
                <v-carousel-item v-for="(image, i) in product.images" :key="i">
                    <v-img :src="image.url" height="300" aspect-ratio="1" contain></v-img>
                </v-carousel-item>
            </v-carousel>
            <v-container class="pt-0">
                <v-card-title class="headline font-weight-medium py-2 px-0">{{ product.name }}</v-card-title>

                <div class="d-flex justify-space-between mb-2">
                    <div class="display-1">¥ {{ product.price }}</div>
                    <div>
                        <v-btn outlined rounded disabled>
                            <v-icon left :color="favoriteColor">favorite</v-icon> いいね
                        </v-btn>
                        <span class="ml-3">{{ product.likes_count }}</span>
                    </div>
                </div>

                <template v-if="product.status === 'trade'">
                    <v-btn color="error" block samll @click="finish" :disabled="loading" :loading="loading"
                        v-if="$store.state.user.user.id === this.product.buyer_id">
                        受け取りを完了する
                    </v-btn>
                    <v-btn color="error" block samll disabled
                        v-if="$store.state.user.user.id === this.product.seller_id">
                        商品を発送しよう！
                    </v-btn>
                </template>
                <template v-else>
                    <v-btn color="error" block samll disabled>商品を発送しよう！</v-btn>
                </template>
            </v-container>

            <v-sheet tile color="grey lighten-3 d-flex align-center" height="30">
                <p class="font-weight-bold py-0 pl-3 ma-0">商品の情報</p>
            </v-sheet>
            <v-simple-table>
                <tbody>
                    <tr>
                        <td>商品状態</td>
                        <td>{{ product.state }}</td>
                    </tr>
                    <tr>
                        <td>カテゴリー</td>
                        <td><v-breadcrumbs  class="px-0" :items="categories" divider=">"></v-breadcrumbs></td>
                    </tr>
                </tbody>
            </v-simple-table>

            <v-sheet tile color="grey lighten-3 d-flex align-center" height="30">
                <p class="font-weight-bold py-0 pl-3 ma-0">商品の説明</p>
            </v-sheet>
            <v-sheet>
                <div class="pa-3">{{ product.description }}</div>
            </v-sheet>

            <v-sheet tile color="grey lighten-3 d-flex align-center" height="30">
                <p class="font-weight-bold py-0 pl-3 ma-0">出品者</p>
            </v-sheet>
            <v-list class="pa-0" flat>
                    <v-list-item @click="$router.push('/mypage')">
                        <v-list-item-avatar>
                            <v-img :src="product.seller.avatar.url"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title v-text="product.seller.name"></v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-icon>
                            <v-icon>mdi-chevron-right</v-icon>
                        </v-list-item-icon>
                    </v-list-item>
            </v-list>
        </v-card>
        <v-card :elevation="0">
            <v-container>
                <v-card :elevation="0" v-for="message in messages" :key="message.id">
                    <v-row>
                        <v-col :cols="2">
                            <v-avatar :size="40" class="mt-4">
                                <img :src="message.user.avatar.url" alt="avatar">
                            </v-avatar>
                        </v-col>
                        <v-col :cols="10" class="pl-0">
                            <p class="mb-1">{{ message.user.name }}</p>
                            <v-sheet class="grey lighten-3 pa-2 message">
                                {{ message.content }}
                            </v-sheet>
                        </v-col>
                    </v-row>
                </v-card>
                <v-textarea v-model="content" outlined placeholder="分からないことなど質問しよう！"></v-textarea>

                <v-btn color="error" block samll :disabled="product.status === 'close'" @click="comment">取引連絡をする</v-btn>
                
            </v-container>
        </v-card>
    </div>
</template>

<script>
import request from '../utils/api.js'

export default {
    name: 'Trade',
    data(){
        return {
            loading: false,
            product: {
                seller: {
                    name: '',
                    avatar: { url: '' }
                },
                category:{
                    name:'',
                    path: []
                }
            },
            liked: false,
            messages: [],
            //commentの内容
            content: '',
            //breadcrumbsリスト用の配列
            category: []
        }
    },
    computed: {
        favoriteColor(){
            return this.liked ? 'red' : 'grey'
        },
        categories(){
            const categories = []
            this.product.category.path.forEach(c => {
                categories.push({ text: c.name })
            })
            return categories
        }
    },
    created(){
        //商品情報を取得
        this.$store.commit('auth/apiRequest')
        request.get(`/api/v1/products/${this.$route.params.id}/trade`, { auth: true })
            .then( response => {
                console.log(response)
                const product = response.data.product
                const user_id = this.$store.state.user.user.id
                if(user_id === product.buyer_id || user_id === product.seller_id){
                    this.product = product
                    this.liked = response.data.like
                    this.messages = response.data.messages
                    this.$store.commit('auth/apiCompleted')
                }else{
                    this.$router.push('/')
                    this.$store.commit('auth/apiCompleted')
                }
            })
            .catch( error => {
                this.$router.push('/')
                this.$store.commit('auth/apiCompleted')
                console.log('error')
            })
    },
    methods: {
        finish(){
            this.loading = true
            request.post(`/api/v1/products/${this.product.id}/complete`, { auth: true })
                .then(response => {
                    this.loading = false
                    this.product.status = "close"
                })
                .catch( error => {
                    this.loading = false
                    console.log('error')
                })
        },
        comment(){
            request.post(`/api/v1/products/${this.product.id}/trade_messages`, { auth: true, params: { content: this.content} })
                .then( response => {
                    this.content = ''
                    this.messages.push(response.data.message)
                })
                .catch(error => {
                    console.log('error comment')
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

.messages{
    border-radius: 10px;
}

.messages:after {
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
