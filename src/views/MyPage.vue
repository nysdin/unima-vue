<template>
    <div id="mypage">
        <v-layout wrap>
            <v-flex xs3>
                <v-avatar :size="80">
                    <img :src="$store.state.user.user.avatar.url">
                </v-avatar>
            </v-flex>
            <v-flex xs9>
                <p>{{ name }}</p>
                <router-link to="/u/edit">プロフィール変更</router-link>
            </v-flex>
        </v-layout>

        <v-list>
            <v-subheader>商品</v-subheader>
            <v-list-group v-for="item in products" :key="item.title" prepend-icon="mdi-account" no-action>
                <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-list-item-content>
                </template>
                <v-list-item v-for="subItem in item.items" :key="subItem.title" @click="toProduct(subItem.status)">
                    <v-list-item-content>
                        <v-list-item-title v-text="subItem.title"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-group>
            <v-list-item @click="$router.push('/mypage/like')">
                <v-list-item-title>いいね</v-list-item-title>
            </v-list-item>
        </v-list>

        
        
        <v-list>
            <v-subheader>設定</v-subheader>
            <v-list-item-group>
                <v-list-item @click="$router.push('/password/edit')">
                    <v-list-item-content>
                        <v-list-item-title v-text="'パスワードの再設定'"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import request from '../utils/api.js'
export default {
    name: 'mypage',
    data(){
        return {
            password: '',
            password_confirmation: '',
            products: [
                {
                    title: '出品', items: [
                        { title: '出品中の商品', status: 'open' },
                        { title: '取引中の商品', status: 'trade' },
                        { title: '終了した商品', status: 'close' }
                    ]
                },
                {
                    title: '購入品', items: [
                        { title: '取引中の商品', status: 'trade' },
                        { title: '終了した商品', status: 'close' }
                    ]
                }
            ]
        }
    },
    computed: {
        ...mapGetters('user', ['name', 'email', 'avatar'])
    },
    methods: {
        passwordReset(){
            request.patch('/api/v1/auth/password', { params: {
                    password: this.password,
                    password_confirmation: this.password_confirmation
                }, auth: true })
                .then(response => console.log(response))
                .catch(error => console.log(error.response.data))
        },
        editUser(){
            this.$router.push('/u/edit')
        },
        toProduct(status){
            this.$router.push({ path: '/mypage/sell', query: { status: status }})
        },
        toPurchase(status){
            this.$router.push({ path: '/mypage/purchase', query: { status: status }})
        }
    }
}
</script>
