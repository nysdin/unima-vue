<template>
    <div>
        <v-container>
            <v-card :elevation="1">
                <v-container>
                    <form id="payment-form">
                        <div class="form-row mb-2">
                            <label for="card-element">
                                クレジットカード
                            </label>
                            <div id="card-element">
                            <!-- A Stripe Element will be inserted here. -->
                            </div>

                            <!-- Used to display form errors. -->
                            <div id="card-errors" role="alert"></div>
                        </div>

                        <div class="d-flex justify-center">
                            <v-btn outlined :loading="loading" :disabled="loading"
                            @click.stop.prevent="registerCregitCard">
                            登録する
                            </v-btn>
                        </div>
                    </form>
                </v-container>
            </v-card>
            
        </v-container>
    </div>
</template>

<script>
const stripe = Stripe('pk_test_GRAL4nR6T1zOJHJIN9YAwGsI003jSsSSud')
import request from '../utils/api.js'

const elements = stripe.elements()

const style = {
    base: {
        // Add your base input styles here. For example:
        fontSize: '16px',
        color: "#32325d",
    },
}

const card = elements.create('card', {style, hidePostalCode: true})

export default {
    name: 'CardCreate',
    data(){
        return{
            loading: false
        }
    },
    methods: {
        async registerCregitCard(){
            this.loading = true
            const {token, error} = await stripe.createToken(card)
            if (error) {
                const errorElement = document.getElementById('card-errors');
                errorElement.textContent = error.message;
                this.loading = false
            } else {
                request.patch('/api/v1/card', {params: { stripe_cregit_token: token.id }, auth: true})
                    .then(response => {
                        console.log(response)
                        if(this.$route.query.back){
                            this.$router.back()
                        }else{
                            this.$router.push('/settings/card')
                        }
                    })
                    .catch(error => {
                        this.loading = false
                        console.log(error)
                    })
            }
        }
    },
    mounted(){
        card.mount('#card-element')
        card.addEventListener('change', ({error}) => {
            const displayError = document.getElementById('card-errors')
            if (error) {
                displayError.textContent = error.message
            } else {
                displayError.textContent = ''
            }
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
</style>
