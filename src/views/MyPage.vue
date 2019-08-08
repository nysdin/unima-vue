<template>
    <div id="mypage">
        <p>{{ this.name }}</p>
        <p>{{ this.email }}</p>
        <img :src="avatar.url">
        <router-link to="/mypage/sell">出品した商品</router-link>
        <router-link to="/mypage/purchase">購入した商品</router-link>
        <router-link to="/mypage/like">いいねした商品</router-link>
        <el-button type="primary" plain @click="editUser">プロフィール変更</el-button>
        <el-form label-position="right" label-width="100px">
            <el-form-item label="Password">
                <el-input v-model="password"></el-input>
            </el-form-item>
            <el-form-item label="PasswordConfirmation">
                <el-input v-model="password_confirmation"></el-input>
            </el-form-item>
        </el-form>
        <el-button type="primary" plain @click="passwordReset">パスワード変更</el-button>
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
        }
    }
}
</script>
