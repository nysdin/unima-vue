<template>
    <div id="register-container">
        <h1>新規登録</h1>
        <el-form label-position="right" label-width="100px" :model="user">
            <el-form-item label="Name">
                <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="Email">
                <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item label="Password">
                <el-input v-model="user.password"></el-input>
            </el-form-item>
            <el-form-item label="PasswordConfirmation">
                <el-input v-model="user.password_confirmation"></el-input>
            </el-form-item>
        </el-form>
        <el-button type="primary" plain @click="register">Register</el-button>
    </div>
</template>

<script>

export default {
    data() {
        return {
            user: {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
            }
        }
    },
    created(){
        
    },
    methods: {
        register(){
            this.$store.dispatch('auth/register', { ...this.user })
                .then( () => {
                    this.$router.push('/')
                })
                .catch( () => {
                    console.log('failed to sign up')
                })
        }
    },
    
}
</script>