<template>
    <div id="password-reset">
        <h1 class="title text-center">パスワード変更用メールアドレス</h1>
        
        <v-container>
            <v-form ref="forms">
                <v-text-field v-model="email" 
                    label="メールアドレス" @click:append="show1 = !show1">
                </v-text-field>

                <div class="d-flex justify-center">
                    <v-btn text large outlined @click="sendEmail">送信する</v-btn>
                </div>
            </v-form>
        </v-container>

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
