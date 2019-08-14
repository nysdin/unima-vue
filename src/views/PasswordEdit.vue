<template>
    <div id="password-edit">
        <h1>パスワード変更</h1>
        
        <v-container>
            <v-form ref="forms">
                <v-text-field v-model="password" :append-icon="show1 ? 'visibility' : 'visibility_off'"
                    :type="show1 ? 'text' : 'password'" label="Password" @click:append="show1 = !show1">
                </v-text-field>

                <v-text-field v-model="passwordConfirmation" :append-icon="show2 ? 'visibility' : 'visibility_off'"
                    :type="show2 ? 'text' : 'password'" label="PasswordConfirmation" @click:append="show2 = !show2">
                </v-text-field>

                <v-btn text large @click="resetPassword">変更</v-btn>
            </v-form>
        </v-container>

    </div>
</template>

<script>
import reqest from '../utils/api.js'

export default {
    name: 'passwordEdit',
    data(){
        return {
            password: '', passwordConfirmation: '', show1: false, show2: false
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
            .catch(error => console.log(error ))
        }
    },
}
</script>
