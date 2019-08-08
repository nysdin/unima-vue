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
            <el-form-item label="Avatar">
                <input type="file" @change="selectedFile">
            </el-form-item>
        </el-form>
        <el-button type="primary" plain @click="editUser">変更</el-button>
    </div>
</template>

<script>
export default {
    name: 'userEdit',
    data(){
        return { name: '', email: '', uploadFile: null }
    },
    methods: {
        editUser(){
            this.$store.dispatch('user/editUser', { name: this.name, email: this.email, avatar: this.uploadFile })
                .then( () => this.$router.push('/mypage'))
                .catch( () => console.log('failed'))
        },
        selectedFile(e){
            e.preventDefault()
            this.uploadFile = e.target.files[0]
        }
    },
    created(){
        this.name = this.$store.state.user.user.name 
        this.email = this.$store.state.user.user.email
    }
}
</script>
