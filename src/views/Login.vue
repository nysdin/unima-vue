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
        this.$store.dispatch('auth/login', { ...this.user })
            .then( () => {
                this.$router.push('/')
            })
            .catch( () => {
            })
        }
    },
    
}
</script>