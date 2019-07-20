<template>
    <div id="password-edit">
        <h1>パスワード変更</h1>
        <el-form label-position="right" label-width="100px">
            <el-form-item label="Password">
                <el-input v-model="password"></el-input>
            </el-form-item>
            <el-form-item label="PasswordConfirmation">
                <el-input v-model="passwordConfirmation"></el-input>
            </el-form-item>
        </el-form>
        <el-button type="primary" plain @click="resetPassword">パスワード変更</el-button>
    </div>
</template>

<script>
import reqest from '../utils/api.js'

export default {
    name: 'passwordEdit',
    data(){
        return {
            password: '', passwordConfirmation: ''
        }
    },
    methods: {
        resetPassword(){
            reqest.patch('/api/v1/auth/password', {
                headers: {
                    'access-token': this.$route.query.token,
                    'client': this.$route.query.client,
                    'uid': this.$route.query.uid
                },
                params: {
                    password: this.password,
                    password_confirmation: this.passwordConfirmation
                }
            })
            .then(response => this.$route.push('/'))
            .catch(error => console.log(error.response))
        }
    },
    created(){
        console.log(this.$route.query.client)
    }
}
</script>
