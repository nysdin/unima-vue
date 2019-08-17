<template>
    <div id="sell">
        <h1>商品の編集</h1>
        <v-container>
            <v-form>
                <v-row>
                    <v-col :cols="3" v-for="(image, i) in images" :key="i">
                        <croppa v-model="images[i]" :width="eachSize" :height="eachSize" ></croppa>
                    </v-col>
                </v-row>
                <v-text-field v-model="product.name" label="商品名" placeholder="商品名" required></v-text-field>
                <v-textarea label="商品の説明" v-model="product.description"></v-textarea>
                <v-text-field v-model="product.price" label="商品の価格" placeholder="価格" required></v-text-field>
                <v-select :items="categoris" v-model="product.category.name" label="カテゴリー"
                ></v-select>
                <v-select :items="states" v-model="product.state" label="商品の状態"
                ></v-select>

                <v-btn medium outlined @click="update">編集する</v-btn>
                <v-btn medium outlined @click="destroy">削除する</v-btn>
            </v-form>
        </v-container>
    </div>
</template>

<script>
import request from '../utils/api.js'

export default {
    name: 'sell',
    data(){
        return{
            size: window.innerWidth,
            product: {
                category: {
                    name: ''
                }
            },
            category: '',
            images: [{}, {}, {}, {}],
            categoris: [ '一般', '文系', '理系'],
            states: ['新品、未使用', '目立った傷や汚れなし', 'やや傷れや汚れあり', '全体的に状態が悪い']
        }
    },
    computed: {
        eachSize(){
            return (this.size - 100 ) / 4
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
        },
        handleResize(){
            this.size = window.innerWidth
        },
    },
    created(){
        this.$store.commit('auth/apiRequest')
        request.get(`/api/v1/products/${this.$route.params.id}`, {})
            .then( response => {
                if(this.$store.state.user.user.id === response.data.product.seller_id){
                    console.log(response)
                    this.product = response.data.product
                    this.$store.commit('auth/apiCompleted')
                }else{
                    this.$router.push('/')
                    this.$store.commit('auth/apiCompleted')
                }
            })
    },
    mounted(){
        window.addEventListener('resize', this.handleResize)
    },
    beforeDestory(){
        window.removeEventListener('resize', this.handleResize)
    }
}
</script>