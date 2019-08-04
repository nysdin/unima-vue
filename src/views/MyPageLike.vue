<template>
    <div class="mypage-sell">
        <Display :items="situatedProduct" />
    </div>
</template>

<script>
import Display from '../components/Display'
import request from '../utils/api.js'

export default {
    name: 'mypageSell',
    components: {
        Display
    },
    data(){
        return {
            products: [],
            status: 'open'
            
        }
    },
    computed: {
        //スクロールで情報を更新するなどしたい
        situatedProduct(){
            return this.products
        }
    },
    methods: {
        open(){
            console.log(this.situatedProduct)
            this.status = 'open'
        },
        trade(){
            this.status = 'trade'
        },
        close(){
            this.status = 'close'
        }
    },
    created(){
        request.get('/api/v1/user/like', { auth: true })
            .then(response => {
                console.log(response.data)
                this.products = response.data
            })
            .catch(error => console.log('error'))
    }
}
</script>

<style>

</style>
