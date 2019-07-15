<template>
    <div id="show">
        <p>{{ item.name }}</p>
        <router-link to="/">ホームへ戻る</router-link><br/>
        <router-link :to="`/sell/${this.$route.params.id}/edit`" v-if="correctUser">商品の編集</router-link>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'productShow',
    data(){
        return {
            item: {}
        }
    },
    computed: {
        correctUser(){
            return this.$store.state.user.user.id === this.item.user_id
        }
    },
    created(){
        axios.get(`http://localhost:3000/api/v1/products/${this.$route.params.id}`)
            .then( response => {
                console.log(response)
                this.item = response.data
            })
            .catch( error => {
                console.log('error')
            })
    }
}
</script>

