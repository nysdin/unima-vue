<template>
    <div id="bank">
        <v-container>
            <v-form>
                    <v-text-field v-model="bank.bank_code" label="金融機関コード" placeholder="1110(4ケタ)"></v-text-field>
                    <v-text-field v-model="bank.branch_code" label="支店コード" placeholder="000(3ケタ)"></v-text-field>
                    <v-text-field v-model="bank.account_number" label="口座番号" placeholder="0001234"></v-text-field>
                    <v-row>
                        <v-col :cols="6">
                            <v-text-field v-model="bank.last_name" label="名義人（姓）" placeholder="ヤマダ"></v-text-field>
                        </v-col>
                        <v-col :cols="6">
                            <v-text-field v-model="bank.first_name" label="名義人（名）" placeholder="タロウ"></v-text-field>
                        </v-col>
                    </v-row>
                
                    <div class="d-flex justify-center">
                        <v-btn medium outlined @click="registerBankAccount" :loading=loading :disabled="loading">
                            登録する
                        </v-btn>
                    </div>
                </v-form>
        </v-container>
    </div>
</template>

<script>
const stripe = Stripe('pk_test_GRAL4nR6T1zOJHJIN9YAwGsI003jSsSSud')
import request from '../utils/api.js'

export default {
    name: 'BankAccount',
    data(){
        return {
            loading: false,
            bank: {
                bank_code: '',
                branch_code: '',
                account_number: '',
                first_name: '',
                last_name: '',
            }
        }
    },
    methods: {
        async registerBankAccount(){
            const {token, error} = await stripe.createToken('bank_account', {
                country: 'JP',
                currency: 'jpy',
                routing_number: this.bank.bank_code + this.bank.branch_code,
                account_number: this.bank.account_number,
                account_holder_name: this.bank.last_name + ' ' + this.bank.first_name,
                account_holder_type: 'individual',
            })

            if(error){
                console.log(error)
            }else{
                request.post('/api/v1/user/bank', {params: {stripe_bank_token: token.id}, auth: true})
                    .then( response => {
                        console.log('sucess')
                    })
                    .catch( error => {
                        console.log(error)
                    })
            }
        }
    }
}
</script>

<style>

</style>
