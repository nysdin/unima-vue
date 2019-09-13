<template>
    <div id="sell">
        <h1>商品の編集</h1>
        <v-container>
            <ValidationObserver v-slot="{ invalid }">
                <v-form>
                    <v-row>
                        <v-col :cols="3" v-for="(image, i) in images" :key="i">
                            <croppa v-model="images[i]" :width="eachSize" :height="eachSize" ></croppa>
                        </v-col>
                    </v-row>
                    <ValidationProvider rules="required|max:40" v-slot="{ errors, valid }">
                        <v-text-field v-model="product.name" label="商品名"
                            placeholder="商品名" required counter="40"
                            :error-messages="errors" :success="valid">
                        </v-text-field>
                    </ValidationProvider>
                    <ValidationProvider rules="required|max:1000" v-slot="{ errors, valid }">
                        <v-textarea label="商品の説明" v-model="product.description"
                            :error-messages="errors" :success="valid"
                            required counter="1000">
                        </v-textarea>
                    </ValidationProvider>
                    <ValidationProvider rules="required|price" v-slot="{ errors, valid }">
                        <v-text-field v-model="product.price" label="商品の価格(~300,000)"
                            placeholder="価格" required prefix="¥" type="number"
                            :error-messages="errors" :success="valid">
                        </v-text-field>
                    </ValidationProvider>
                    <ValidationProvider rules="required" v-slot="{ errors, valid }">
                        <v-select :items="categoris" v-model="product.category.name"
                            label="カテゴリー" required
                            :error-messages="errors" :success="valid">
                        </v-select>
                    </ValidationProvider>
                    <ValidationProvider rules="required" v-slot="{ errors, valid }">
                        <v-select :items="states" v-model="product.state"
                            label="商品の状態" required
                            :error-messages="errors" :success="valid">
                        </v-select>
                    </ValidationProvider>

                    <v-btn medium outlined @click="update" 
                        :disabled="invalid || loading" color="primary">
                        編集する
                    </v-btn>
                    <v-btn medium outlined @click="destroy"
                        :disabled="loading" color="primary" class="ml-2">
                        削除する
                    </v-btn>
                </v-form>
            </ValidationObserver>
        </v-container>
    </div>
</template>

<script>
import request from '../utils/api.js'
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
    name: 'sell',
    components: {
        ValidationProvider,
        ValidationObserver,
    },
    data(){
        return{
            loading: false,
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
            this.loading = true
            request.patch(`/api/v1/products/${this.$route.params.id}`, { params: this.product, auth: true})
                .then( response => {
                    this.loading = false
                    this.$router.push({ path: `/product/${response.data.id}` })
                })
                .catch( error => {
                    this.loading = false
                    console.log('error')
                })
        },
        destroy(){
            this.loading = true
            request.delete(`/api/v1/products/${this.$route.params.id}`, { params: this.product, auth: true })
                .then( () => {
                    this.loading = false
                    this.$router.push({ path: '/' })
                })
                .catch( () => {
                    this.loading = false
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