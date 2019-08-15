<template>
    <div id="sell">
        <h1>商品追加</h1>
        <v-container>
            <v-form>
                <v-row>
                    <v-col :cols="3" v-for="(image, i) in images" :key="i">
                        <croppa v-model="images[i]" :width="eachSize" :height="eachSize" ></croppa>
                    </v-col>
                </v-row>
                <v-text-field v-model="product.name" label="商品名" placeholder="商品名" required></v-text-field>
                <v-textarea label="商品の説明" v-model="product.description"
                    hint="Hint text"
                ></v-textarea>
                <v-text-field v-model="product.price" label="商品の価格" placeholder="価格" required></v-text-field>
                <v-select :items="categoris" v-model="product.category" label="カテゴリー"
                ></v-select>
                <v-select :items="states" v-model="product.state" label="商品の状態"
                ></v-select>

                <v-btn medium outlined @click="sell">Button</v-btn>
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
            file: null,
            size: window.innerWidth,
            images: [{}, {}, {}, {}],
            product: {
                name: '',
                description: '',
                price: '',
                state: '',
                category: '',
            },
            categoris: [
                { text: '一般', value: 'general' },
                { text: '文系', value: 'humanity' },
                { text: '理系', value: 'science' }
            ],
            states: [
                {text: '新品、未使用', value: 'new'},
                {text: '目立った傷や汚れなし', value: 'almost_new'},
                {text: 'やや傷れや汚れあり', value: 'almost_old'},
                {text: '全体的に状態が悪い', value: 'old'}
            ]
        }
    },
    computed: {
        eachSize(){
            return (this.size - 100 ) / 4
        }
    },
    methods: {
        async sell(){
            const params = new FormData()
            Object.keys(this.product).forEach(key => {
                params.append(key, this.product[key])
            })
            for(let image of this.images){
                const blob = await image.promisedBlob()
                const filename = image.getChosenFile().name
                params.append('images[]', blob, filename)
                console.log(blob)
            }
            request.post('/api/v1/products', { params: params, auth: true })
                .then( response => {
                    this.$router.push({ path: `/product/${response.data.id}`})
                })
                .catch( error => {
                    console.log(error)
                })
        },
        handleResize(){
            this.size = window.innerWidth
        },
    },
    mounted(){
        window.addEventListener('resize', this.handleResize)
    },
    beforeDestory(){
        window.removeEventListener('resize', this.handleResize)
    }
}
</script>

