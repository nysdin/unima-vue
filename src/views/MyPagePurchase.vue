<template>
    <div class="mypage-purchase">
        <el-button type="primary" @click="trade">取引中</el-button>
        <el-button type="primary" @click="close">取引終了</el-button>
        <Display :items="situatedProduct" />
    </div>
</template>

<script>
import Display from '../components/Display'
import request from '../utils/api.js'

export default {
    name: 'mypagePurchase',
    components: {
        Display
    },
    data(){
        return {
            products: [],
            status: 'trade'
            
        }
    },
    computed: {
        //スクロールで情報を更新するなどしたい
        situatedProduct(){
            return this.products.filter(product => product.status === this.status)
        }
    },
    methods: {
        trade(){
            this.status = 'trade'
        },
        close(){
            this.status = 'close'
        }
    },
    created(){
        request.get('/api/v1/user/purchase', { auth: true })
            .then(response => this.products = response.data)
            .catch(error => console.log('error'))
    }
}
</script>

<style>

</style>
