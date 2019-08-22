<template>
    <div id="register-container">
        <h1 class="text-center">新規登録</h1>
        <v-container>
            <v-form>
                <v-text-field v-model="user.name" label="名前" placeholder="アカウント名" required></v-text-field>
                <v-text-field v-model="user.email" label="メールアドレス" placeholder="test@example.com" required></v-text-field>
                <v-text-field v-model="user.password" :append-icon="show1 ? 'visibility' : 'visibility_off'"
                label="パスワード" required :type="show1 ? 'text' : 'password'" placeholder="6文字以上"
                @click:append="show1 = !show1"></v-text-field>
                <v-text-field v-model="user.password_confirmation" :append-icon="show2 ? 'visibility' : 'visibility_off'"
                label="パスワード（確認）" required :type="show2 ? 'text' : 'password'" placeholder="6文字以上"
                @click:append="show2 = !show2"></v-text-field>

                <div class="d-flex justify-center">
                    <v-btn medium outlined @click="register">新規登録</v-btn>
                </div>
            </v-form>
        </v-container>
    </div>
</template>

<script>

export default {
    data() {
        return {
            show1: false,
            show2: false,
            user: {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
            }
        }
    },
    methods: {
        register(){
            this.$store.dispatch('auth/register', { ...this.user })
                .then( () => {
                    this.$router.push('/')
                })
                .catch( errors => {
                    errors.forEach(error => {
                        setTimeout( () => {
                            this.renderError(error)
                        }, 0)
                    })
                })
        },
        renderError(error){
            this.$notify({
                title: 'Warning',
                message: error,
                type: 'warning'
            });
        },
        toLogin(){
            this.$router.push('/login')
        }
    },
    
}
</script>

<style>
.avatar{
    border-radius: 50%;
    cursor: pointer;
}
</style>
