<template>
    <div id="payment">
        <v-container>
                <v-card :elevation='1'>
                    <v-card-title>クレジットカード</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text class="card-info">
                        <template v-if="brand">
                            <div class="d-flex justify-space-between">
                                <div>
                                    <p class="mb-1">{{ brand }}</p>
                                    <p class="mb-1"> {{ last4 }}</p>
                                    <p class="mb-1">{{ exp_month }} / {{ exp_year }}</p>
                                </div>
                                <div class="d-flex align-self-center flex-column">
                                    <v-btn text small color="error" class="mb-2"
                                    @click="deleteCregitCard" :loading="loading" :disabled=loading>
                                        削除
                                    </v-btn>
                                    <v-btn text small color="primary" class="inline-block"
                                    @click="$router.push('/settings/card/create')">
                                        変更
                                    </v-btn>
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <div class="d-flex justify-center">
                                <v-btn outlined color="primary" @click="$router.push('/settings/card/create')">登録する</v-btn>
                            </div>
                        </template>

                        <v-overlay :value="init" :opacity="1" color="white" absolute>
                            <v-progress-circular indeterminate size="40" color="primary"></v-progress-circular>
                        </v-overlay>
                    </v-card-text>
                </v-card>
        </v-container>
    </div>
</template>

<script>
import request from '../utils/api.js'

export default {
    name: 'Card',
    data(){
        return {
            init: true,
            loading: false,
            brand: '',
            exp_month: '',
            exp_year: '',
            last4: '',
        }
    },
    methods: {
        async registerCregitCard(){
            this.loading = true
            const {token, error} = await $stripe.createToken(card)
            if (error) {
                // Inform the customer that there was an error.
                this.loading = false
                const errorElement = document.getElementById('card-errors')
                errorElement.textContent = error.message
            } else {
                request.patch('/api/v1/card', {params: {stripe_cregit_token: token.id}, auth: true})
                    .then(response => {
                        this.loading = false
                        this.$router.push('/mypage')
                        console.log('success')
                    })
                    .catch(error => {
                        this.loading = false
                        console.log('error')
                    })
            }
        },
        deleteCregitCard(){
            this.loading = true
            request.delete('/api/v1/card', { auth: true })
                .then(respones => {
                    this.loading = false
                    this.brand = '',
                    this.exp_month = '',
                    this.exp_year = '',
                    this.last4 = '',
                    console.log('success')
                })
                .catch(error => {
                    console.log('error')
                    this.loading = false
                })
        }
    },
    mounted(){
        request.get('/api/v1/card', {auth: true})
            .then(response => {
                console.log(response)
                const data = response.data
                this.brand = data.brand
                this.exp_month = ("00" + data.exp_month).slice(-2)
                this.exp_year = data.exp_year
                this. last4 = '**** **** **** ' + data.last4
                this.init = false
            })
            .catch(error => {
                console.log(error)
                this.init = false
            })
    }
}
</script>

<style>

.StripeElement {
    box-sizing: border-box;

    height: 40px;

    padding: 10px 12px;

    border: 1px solid transparent;
    border-radius: 4px;
    background-color: white;

    box-shadow: 0 1px 3px 0 #e6ebf1;
    -webkit-transition: box-shadow 150ms ease;
    transition: box-shadow 150ms ease;
}

.StripeElement--focus {
    box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
    border-color: #fa755a;
}

.StripeElement--webkit-autofill {
    background-color: #fefde5 !important;
}

.card-info{
    position: relative;
}
</style>