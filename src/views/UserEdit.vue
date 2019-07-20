<template>
    <div id="user-edit">
        <h1>プロフィール変更</h1>
        <el-form label-position="right" label-width="100px">
            <el-form-item label="Name">
                <el-input v-model="name"></el-input>
            </el-form-item>
            <el-form-item label="Email">
                <el-input v-model="email"></el-input>
            </el-form-item>
        </el-form>
        <el-button type="primary" plain @click="editUser">変更</el-button>
    </div>
</template>

<script>
export default {
    name: 'userEdit',
    data(){
        return { name: '', email: '' }
    },
    methods: {
        editUser(){
            this.$store.dispatch('user/editUser', { name: this.name, email: this.email })
                .then( () => this.$router.push('/mypage'))
                .catch( () => console.log('failed'))
        }
    },
    created(){
        this.name = this.$store.state.user.user.name 
        this.email = this.$store.state.user.user.email
    }
}
</script>
