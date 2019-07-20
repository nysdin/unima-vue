<template>
    <div id="password-reset">
        <h1>パスワード変更用メールアドレス</h1>
        <el-form label-position="right" label-width="100px">
            <el-form-item label="Email">
                <el-input v-model="email"></el-input>
            </el-form-item>
        </el-form>
        <el-button type="primary" plain @click="sendEmail">送信する</el-button>
    </div>
</template>

<script>
import request from '../utils/api.js'

export default {
    name: 'passwordReset',
    data(){
        return {
            email: ''
        }
    },
    methods: {
        sendEmail(){
            request.post('/api/v1/auth/password', {
                params: {
                    email: this.email,
                    redirect_url: process.env.VUE_APP_CLIENT_URL + '/password/edit'
                }
            })
            .then( () => console.log('success'))
            .catch( () => console.log('failed'))
        },
    }
}
</script>
