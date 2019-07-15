<template>
    <div id="show">
        <p>{{ item.name }}</p>
        <router-link to="/">ホームへ戻る</router-link>
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

