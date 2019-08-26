<template>
    <div id="sell">
        <h1>商品追加</h1>
        <v-container>
            <v-form>
                <v-row>
                    <v-col :cols="3" v-for="(image, i) in images" :key="i" class="pb-0">
                        <v-dialog v-model="dialogs[i].dialog"
                            :key="i" :width="500">
                            <template v-slot:activator="{ on }">
                                <!-- <croppa v-model="images[i]" 
                                passive :placeholder="`画像${i+1}`" class="images">
                                    <div class="append" v-on="on"></div>
                                </croppa> -->
                                <v-sheet :width="eachSize" :height="eachSize"
                                    @click="dialogs[i].dialog = true" style="cursor: pointer;">
                                        <v-icon class="camera-icon">mdi-camera</v-icon>
                                    <v-img :width="eachSize" :hight="eachSize" v-if="!previewImages[i]"
                                        contain :src="previewImages[i]"></v-img>
                                </v-sheet>
                            </template>
                            <v-card>
                                <div class="d-flex justify-center">
                                    <v-card-title>商品画像を追加</v-card-title>
                                </div>
                                <div class="d-flex justify-center" ref="modalView">
                                    <croppa v-model="images[i]" :width="modalImageSize" :height="modalImageSize"
                                    :placeholder="`画像${i+1}`"></croppa>
                                </div>
                                <v-card-actions class="d-flex justify-center">
                                    <v-btn text @click="removeImage(i)" v-if="previewImages[i]">削除</v-btn>
                                    <v-btn text @click="cancelImage(i)" v-if="!previewImages[i]">キャンセル</v-btn>
                                    <v-btn text @click="addImage(i)">追加</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
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

                <div class="d-flex justify-center">
                    <v-btn medium outlined @click="sell">出品する</v-btn>
                </div>
            </v-form>

        </v-container>
    </div>
</template>

<script>
import Vue from 'vue'
import request from '../utils/api.js'

export default {
    name: 'sell',
    data(){
        return{
            dialogs: [
                {dialog: false},
                {dialog: false},
                {dialog: false},
                {dialog: false}
            ],
            size: window.innerWidth,
            images: [{}, {}, {}, {}],
            previewImages: ['', '', '', ''],
            product: {
                name: '',
                description: '',
                price: '',
                state: '',
                category: '',
            },
            categoris: [ '一般', '文系', '理系'],
            states: ['新品、未使用', '目立った傷や汚れなし', 'やや傷れや汚れあり', '全体的に状態が悪い']
        }
    },
    computed: {
        eachSize(){
            return (this.size - 100 ) / 4
        },
        modalImageSize(){
            return (window.innerWidth - 48) * 0.8
        }
    },
    methods: {
        async sell(){
            const params = new FormData()
            Object.keys(this.product).forEach(key => {
                params.append(key, this.product[key])
            })
            for(let image of this.images){
                if(Object.keys(image).length){
                    const blob = await image.promisedBlob()
                    const file = image.getChosenFile()
                    if(file){
                    params.append('images[]', blob, file.name)
                    console.log(blob)
                }
                }
            }
            request.post('/api/v1/products', { params: params, auth: true })
                .then( response => {
                    this.$router.push({ path: `/product/${response.data.id}`})
                })
                .catch( error => {
                    console.log(error)
                })
        },
        addImage(index){
            this.dialogs[index].dialog = false
            let image = this.images[index]
            let url = image.generateDataUrl()
            Vue.set(this.previewImages, index, url)
        },
        cancelImage(index){
            this.dialogs[index].dialog = false
            let image = this.images[index]
            image.remove()
        },
        removeImage(index){
            this.dialogs[index].dialog = false
            let image = this.images[index]
            image.remove()
            Vue.set(this.previewImages, index, '')
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


<style>

.images canvas{
    width: 100%!important;
    height: 100%!important;
}

.append{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    cursor: pointer;
}

.append:hover{
    opacity: 0.6;
}

.camera-icon{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    -webkit-transform: translateY(-50%) translateX(-50%);
}
</style>
