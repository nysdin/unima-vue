<template>
    <div id="login-container">
        <el-form label-position="right" label-width="100px" :model="user">
            <el-form-item label="Email">
                <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item label="Password">
                <el-input v-model="user.password"></el-input>
            </el-form-item>
        </el-form>
        <el-button type="primary" plain @click="login">Login</el-button>
        <el-button type="primary" plain @click="logout">Logout</el-button>
    </div>
</template>

<script>

export default {
    data() {
        return {
            user: { email: 'ysthon@gmail.com', password: 'password'}
        }
    },
    created(){
        
    },
    methods: {
        login(){
        this.$store.dispatch('auth/login', { params: { ...this.user }, url: 'http://localhost:3000/api/v1/auth/sign_in' })
            .then( () => {
            console.log('loggedin')
            })
            .catch( () => {
            console.log('login error')
            })
        },
        logout(){
        this.$store.dispatch('auth/logout', { auth: true, url: 'http://localhost:3000/api/v1/auth/sign_out' })
        }
    },
    
}
</script>