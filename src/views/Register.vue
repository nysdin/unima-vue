<template>
    <div id="register-container">
        <!-- Unimaアカウントの情報 -->

        <v-stepper v-model="stepper" vertical>
            <v-stepper-step :complete="stepper > 1" step="1">
                会員情報　<small>アカウントの詳細情報</small>
            </v-stepper-step>

            <v-stepper-content step="1">
                <v-card >
                    <v-form>
                        <ValidationObserver v-slot="{ invalid }">
                            <ValidationProvider name="ニックネーム" rules="required" v-slot="{ errors, valid }">
                                <v-text-field v-model="user.name" label="ニックネーム" 
                                    placeholder="アカウント名" :success="valid" required
                                    :error-messages="errors">
                                </v-text-field>
                            </ValidationProvider>
                            <ValidationProvider name="メールアドレス" rules="required|email" v-slot="{ errors, valid }">
                                <v-text-field v-model="user.email" label="メールアドレス" 
                                    placeholder="test@example.com" type="email" required
                                    :success="valid" :error-messages="errors">
                                </v-text-field>
                            </ValidationProvider>
                            <ValidationProvider name="パスワード" rules="required|min:6" v-slot="{ errors, valid }">
                                <v-text-field v-model="user.password" label="パスワード" required
                                    :append-icon="show1 ? 'visibility' : 'visibility_off'"
                                    :type="show1 ? 'text' : 'password'" placeholder="6文字以上"
                                    :success="valid" :error-messages="errors"
                                    @click:append="show1 = !show1">
                                </v-text-field>
                            </ValidationProvider>
                            <ValidationProvider name="パスワード(確認)" rules="required|password:パスワード" v-slot="{ errors, valid }">
                                <v-text-field v-model="user.password_confirmation" label="パスワード（確認）"
                                    :append-icon="show2 ? 'visibility' : 'visibility_off'"
                                    :type="show2 ? 'text' : 'password'" placeholder="6文字以上" required
                                    :success="valid" :error-messages="errors"
                                    @click:append="show2 = !show2"></v-text-field>
                            </ValidationProvider>

                            <v-btn medium @click="validateUser" color="primary"
                                :loading="loading" :disabled="loading || invalid">
                                次へ進む
                            </v-btn>
                        </ValidationObserver>
                    </v-form>
                </v-card>
            </v-stepper-content>

            <!-- Stripeアカウントの情報 -->

            <v-stepper-step :complete="stepper > 2" step="2">
                本人確認情報　<small>決済に関する必要な情報</small>
            </v-stepper-step>

            <v-stepper-content step="2">
                <v-card flat>
                    <v-form>
                        <ValidationObserver v-slot="{ invalid }">
                            <v-row>
                                <v-col :cols="6">
                                    <ValidationProvider rules="required" v-slot="{ errors, valid }">
                                        <v-text-field v-model="individual.last_name_kanji" 
                                            label="苗字（漢字）" placeholder="山田" required
                                            :error-messages="errors" :success="valid">
                                        </v-text-field>
                                    </ValidationProvider>
                                </v-col>
                                <v-col :cols="6">
                                    <ValidationProvider rules="required" v-slot="{ errors, valid }">
                                        <v-text-field v-model="individual.first_name_kanji" 
                                            label="名前（漢字）" placeholder="太朗" required
                                            :error-messages="errors" :success="valid">
                                        </v-text-field>
                                    </ValidationProvider>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col :cols="6">
                                    <ValidationProvider rules="required|katakana" v-slot="{ errors, valid }">
                                        <v-text-field v-model="individual.last_name_kana" 
                                            label="苗字（カナ）" placeholder="ヤマダ" required
                                            :error-messages="errors" :success="valid">
                                        </v-text-field>
                                    </ValidationProvider>
                                </v-col>
                                <v-col :cols="6">
                                    <ValidationProvider rules="required|katakana" v-slot="{ errors, valid }">
                                        <v-text-field v-model="individual.first_name_kana" 
                                            label="名前（カナ）" placeholder="タロウ" required
                                            :error-messages="errors" :success="valid">
                                        </v-text-field>
                                    </ValidationProvider>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col :cols="6">
                                    <ValidationProvider rules="required" v-slot="{ errors, valid }">
                                        <v-text-field v-model="phone" label="電話番号(ハイフンなし)"
                                            placeholder="09012345678" type="number" required
                                            :error-messages="errors" :success="valid">
                                        </v-text-field>
                                    </ValidationProvider>
                                </v-col>
                                <v-col :cols="6">
                                    <ValidationProvider rules="required" v-slot="{ errors, valid }">
                                        <v-select v-model="individual.gender" label="性別"
                                            :items="[{text: '男', value: 'male'}, {text:'女', value:'female'}]"
                                            :error-messages="errors" :success="valid">
                                        </v-select>
                                    </ValidationProvider>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col :cols="4">
                                    <ValidationProvider rules="required" v-slot="{ errors, valid }">
                                        <v-select v-model="individual.dob.year" label="生年"
                                            :items="years"
                                            :error-messages="errors" :success="valid">
                                        </v-select>
                                    </ValidationProvider>
                                </v-col>
                                <v-col :cols="4">
                                    <ValidationProvider rules="required" v-slot="{ errors, valid }">
                                        <v-select v-model="individual.dob.month" label="生月"
                                            :items="months"
                                            :error-messages="errors" :success="valid">
                                        </v-select>
                                    </ValidationProvider>
                                </v-col>
                                <v-col :cols="4">
                                    <ValidationProvider rules="required" v-slot="{ errors, valid }">
                                        <v-select v-model="individual.dob.day" label="生日"
                                            :items="days"
                                            :error-messages="errors" :success="valid">
                                        </v-select>
                                    </ValidationProvider>
                                </v-col>
                            </v-row>
                            <ValidationProvider rules="required|postalCode" v-slot="{ errors, valid }">
                                <v-text-field v-model="individual.address_kanji.postal_code" 
                                    label="郵便番号(ハイフンなし)" placeholder="1500001" type="number"
                                    :error-messages="errors" :success="valid" required>
                                </v-text-field>
                            </ValidationProvider>
                            <ValidationProvider rules="required" v-slot="{ errors, valid }">
                                <v-text-field v-model="individual.address_kanji.state" 
                                    label="都道府県名" placeholder="東京都" required
                                    :error-messages="errors" :success="valid">
                                </v-text-field>
                            </ValidationProvider>
                            <ValidationProvider rules="required|katakana" v-slot="{ errors, valid }">
                                <v-text-field v-model="individual.address_kana.state"
                                    label="都道府県名（カナ）" placeholder="トウキョウト" required
                                    :error-messages="errors" :success="valid">
                                </v-text-field>
                            </ValidationProvider>
                            <ValidationProvider rules="required" v-slot="{ errors, valid }">
                                <v-text-field v-model="individual.address_kanji.city"
                                    label="市区町村" placeholder="渋谷区" required
                                    :error-messages="errors" :success="valid">
                                </v-text-field>
                            </ValidationProvider>
                            <ValidationProvider rules="required|katakana" v-slot="{ errors, valid }">
                                <v-text-field v-model="individual.address_kana.city"
                                    label="市区町村（カナ）" placeholder="シブヤク" required
                                    :error-messages="errors" :success="valid">
                                </v-text-field>
                            </ValidationProvider>
                            <ValidationProvider rules="required" v-slot="{ errors, valid }">
                                <v-text-field v-model="individual.address_kanji.town"
                                    label="町名(丁目まで)" placeholder="神宮前　１丁目" required
                                    :error-messages="errors" :success="valid">
                                </v-text-field>
                            </ValidationProvider>
                            <ValidationProvider rules="required" v-slot="{ errors, valid }">
                                <v-text-field v-model="individual.address_kana.town"
                                    label="町名(カナ）" placeholder="ジングウマエ　1-" required
                                    :error-messages="errors" :success="valid">
                                </v-text-field>
                            </ValidationProvider>
                            <ValidationProvider rules="required" v-slot="{ errors, valid }">
                                <v-text-field v-model="individual.address_kanji.line1"
                                    label="番地、号" placeholder="5-8" required
                                    :error-messages="errors" :success="valid">
                                </v-text-field>
                            </ValidationProvider>
                            <ValidationProvider rules="required" v-slot="{ errors, valid }">
                                <v-text-field v-model="individual.address_kana.line1"
                                    label="番地、号（カナ）" placeholder="5-8" required
                                    :error-messages="errors" :success="valid">
                                </v-text-field>
                            </ValidationProvider>
                            <v-text-field v-model="individual.address_kanji.line2"
                                label="建物・部屋番号・その他" placeholder="神宮前タワービルディング22F" 
                                required>
                            </v-text-field>
                            <v-text-field v-model="individual.address_kana.line2"
                                label="建物・部屋番号・その他（カナ）" placeholder="ジングウマエタワービルディングﾞ22F"
                                required>
                            </v-text-field>

                            <v-btn medium @click="register" color="primary"
                                :loading="loading" :disabled="loading || invalid">
                                次へ進む
                            </v-btn>
                            <p class="caption mb-0 mt-2">
                                ※次へ進むを押したことにより、<a @click="dialog = true">利用規約</a>に同意したものとします.
                            </p>
                        </ValidationObserver>
                    </v-form>
                </v-card>

                <v-dialog v-model="dialog" scrollable>
                    <v-card>
                        <v-card-title>
                            利用規約
                        </v-card-title>
                        <v-card-text>
                            Unimaにおける出品者向けの支払処理サービスは、Stripeが提供し、
                            <a href="https://stripe.com/jp/connect-account/legal" target=”_blank”>Stripe Connectアカウント契約</a>
                            (<a href="https://stripe.com/jp/legal" target=”_blank”>Stripe利用規約</a>を含み、総称して「Stripeサービス契約」といいます。）
                            に従うものとします。[本契約、本条件等]への同意又はUnimaにおいて取引関係者としての取引の継続により、
                            お客様はStripeサービス契約（随時Stripeにより修正されることがあり、その場合には修正されたものを含みます。）
                            に拘束されることに同意するものとします。 Stripeを通じた支払処理サービスをUnimaができるようにするための条件
                            として、お客様は、Unimaに対してお客様及びお客様の事業に関する正確かつ完全な情報を提供することに同意し、
                            Unimaが当該情報及びStripeが提供する支払処理サービスの
                            お客様による使用に関連する取引情報を共有することを認めるものとします。
                        </v-card-text>
                        <v-card-actions class="d-flex justify-center">
                            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

            </v-stepper-content>

            <v-stepper-step step="3" :complete="stepper > 3">
                支払い方法<small>クレジットカード情報</small>
            </v-stepper-step>

            <v-stepper-content step="3">
                <v-card>
                    <p class="caption">※こちらの入力をスキップしてアカウント登録後設定することもできます。</p>
                    <form id="payment-form" class="mb-3">
                        <div class="form-row">
                            <label for="card-element">
                            クレジットカード
                            </label>
                            <div id="card-element">
                            <!-- A Stripe Element will be inserted here. -->
                            </div>

                            <!-- Used to display Element errors. -->
                            <div id="card-errors" role="alert"></div>
                        </div>
                    </form>

                    <v-btn small @click="createCregitToken" color="primary"
                        :loading="loading" :disabled="loading">
                        次へ進む
                    </v-btn>
                    <v-btn small @click="stepper += 1" color="primary" class="ml-2" >スキップする</v-btn>
                </v-card>

            </v-stepper-content>

            <v-stepper-step step="4" :complete="stepper > 4">
                銀行口座 <small>売上金の振込先情報</small>
            </v-stepper-step>

            <v-stepper-content step="4">
                <v-card>
                    <p class="caption">※こちらの入力をスキップしてアカウント登録後設定することもできます。</p>
                    <v-form>
                        <ValidationProvider rules="required|number4" v-slot="{ errors, valid }">
                            <v-text-field v-model="bank.bank_code" type="number"
                                label="金融機関コード" placeholder="1110(4ケタ)"
                                :error-messages="errors" :success="valid">
                            </v-text-field>
                        </ValidationProvider>
                        <ValidationProvider rules="required|number3" v-slot="{ errors, valid }">
                            <v-text-field v-model="bank.branch_code" type="number"
                                label="支店コード" placeholder="000(3ケタ)"
                                :error-messages="errors" :success="valid">
                            </v-text-field>
                        </ValidationProvider>
                        <ValidationProvider rules="required|number7" v-slot="{ errors, valid }">
                            <v-text-field v-model="bank.account_number" type="number"
                                label="口座番号" placeholder="0001234"
                                :error-messages="errors" :success="valid">
                            </v-text-field>
                        </ValidationProvider>
                        <span class="caption"><a @click="dialog1 = true">※口座番号について</a></span>
                        <v-dialog v-model="dialog1">
                            <v-card>
                                <v-card-text>
                                    口座番号が7桁未満の場合は先頭に0を付け足して7桁にしてください.
                                </v-card-text>
                                <v-card-actions class="d-flex justify-center">
                                    <v-btn color="blue darken-1" text @click="dialog1 = false">Close</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-row>
                            <v-col :cols="6">
                                <ValidationProvider rules="required" v-slot="{ errors, valid }">
                                    <v-text-field v-model="bank.last_name"
                                        label="名義人（姓）" placeholder="ヤマダ"
                                        :error-messages="errors" :success="valid">
                                    </v-text-field>
                                </ValidationProvider>
                            </v-col>
                            <v-col :cols="6">
                                <ValidationProvider rules="required" v-slot="{ errors, valid }">
                                    <v-text-field v-model="bank.first_name"
                                        label="名義人（名）" placeholder="タロウ"
                                        :error-messages="errors" :success="valid">
                                    </v-text-field>
                                </ValidationProvider>
                            </v-col>
                        </v-row>
                        
                        <v-btn small @click="createBankAccount" color="primary"
                            :loading="loading" :disabled="loading">
                            次へ進む
                        </v-btn>
                        <v-btn small @click="stepper += 1" color="primary" class="ml-2" >スキップする</v-btn>
                    </v-form>
                </v-card>

            </v-stepper-content>

            <v-stepper-step step="5">
                完了
            </v-stepper-step>

            <v-stepper-content step="5">
                <v-card flat>
                        <p class="subtitle-1">アカウント登録が完了しました</p>
                        <v-btn medium @click="complete" color="primary"
                            :loading="loading" :disabled="loading">
                            Unimaをはじめる
                        </v-btn>
                </v-card>
            </v-stepper-content>
    </v-stepper>
    </div>
</template>

<script>
import request from '../utils/api.js'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required, email, min } from "vee-validate/dist/rules"

extend("required", {
    ...required,
    message: "必須項目です."
})

extend("email", {
    ...email,
    message: "有効なメールアドレスではございません."
})

extend("min", {
    ...min,
    message: "{_field_}は{length}文字以上で入力してください."
})

extend("password", {
    validate: (value, { other }) => value === other,
    message: "パスワードと一致していいません.",
    params: [{ name: 'other', isTarget: true }]
})

extend("katakana", {
    validate: value => value.match(/^[ァ-ヶー　]*$/),
    message: "カタカナでない文字が含まれています."
})

extend("postalCode", {
    validate: value => value.match(/^\d{7}$/),
    message: "不正な入力です."
})

extend("number3", {
    validate: value => value.match(/^\d{3}$/),
    message: "3桁で入力してください."
})

extend("number4", {
    validate: value => value.match(/^\d{4}$/),
    message: "4桁で入力してください."
})

extend("number7", {
    validate: value => value.match(/^\d{7}$/),
    message: "7桁で入力してください."
})

export default {
    name: 'Register',
    components: {
        ValidationProvider,
        ValidationObserver
    },
    data() {
        return {
            card: null,
            stepper: 1,
            show1: false,
            show2: false,
            loading: false,
            dialog: false,
            dialog1: false,
            user: {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
            },
            individual: {
                address_kanji: {
                    postal_code: '1500001',
                    state: '東京都',
                    city: '渋谷区',
                    town: '神宮前 １丁目',
                    line1: '5-8',
                    line2: '',
                },
                address_kana: {
                    postal_code: '',
                    state: 'トウキョウト',
                    city: 'シブヤク',
                    town: 'ジングウマエ 1-',
                    line1: '5-8',
                    line2: '',
                },
                dob: {
                    day: '', month: '', year: '',
                },
                last_name_kanji: '', last_name_kana: '',
                first_name_kanji: '', first_name_kana: '',
                gender: '', phone: '',
            },
            bank: {
                bank_code: '',
                branch_code: '',
                account_number: '',
                first_name: '',
                last_name: '',
            },
            phone: '09012345678',
            isCard: false,
            isBank: false,
        }
    },
    computed: {
        years(){
            return [...Array(60)].map((v,i) => i + 1960)
        },
        months(){
            return [...Array(12)].map((v,i) => ++i)
        },
        days(){
            return [...Array(31)].map((v,i) => ++i)
        }
    },
    methods: {
        complete(){
            this.loading = true
            this.$store.dispatch('auth/completeSignUp')
                .then(response => {
                    console.log('complete')
                    this.loading = false
                })
                .catch(error => {
                    this.renderError('アカウントを登録し直すか、ログインを行ってください.')
                    this.loading = false
                })
        },
        register(){
            this.loading = true
            this.individual.address_kana.postal_code = this.individual.address_kanji.postal_code
            this.individual.phone = '+81' + this.phone
            request.post('/api/v1/auth', { params: { ...this.user, ...this.individual }})
                .then(response => {
                    const headers = response.headers
                    localStorage.setItem('access-token', headers['access-token'])
                    localStorage.setItem('client', headers['client'])
                    localStorage.setItem('uid', headers['uid'])
                    this.stepper += 1
                    this.loading = false
                    console.log('ok')
                })
                .catch(error => {
                    console.log(error.response)
                    const errors = error.response.data.errors
                    errors.forEach(error => {
                    setTimeout( () => {
                            this.renderError(error)
                        }, 0)
                    })
                    this.loading = false
                })
        },
        validateUser(){
            this.loading = true
            const {name, email, password, password_confirmation} = this.user
            
            request.post('/api/v1/user/validate', {
                params: { name, email, password, password_confirmation }
            })
            .then(response => {
                this.stepper += 1
                this.loading = false
            })
            .catch(error => {
                const errors = error.response.data.errors
                errors.forEach(error => {
                    setTimeout( () => {
                        this.renderError(error)
                    }, 0)
                })
                this.loading = false
                console.log(error.response)
            })
        },
        renderError(error){
            this.$notify({
                title: 'Warning',
                message: error,
                type: 'warning'
            });
        },
        async createCregitToken(){
            this.loading = true
            const {token, error} = await this.$stripe.createToken(this.card)
            if (error) {
                // Inform the customer that there was an error.
                const errorElement = document.getElementById('card-errors')
                errorElement.textContent = error.message
                this.loading = false
            } else {
                // Send the token to your server.
                request.patch('/api/v1/card', {params: { stripe_cregit_token: token.id }, auth: true})
                    .then(response => {
                        console.log(response)
                        this.stepper += 1
                        this.loading = false
                        this.isCard = true
                    })
                    .catch(error => {
                        this.loading = false
                        console.log(error)
                    })
            }
        },
        async createBankAccount(){
            this.loading = true
            const {token, error} = await this.$stripe.createToken('bank_account', {
                country: 'JP',
                currency: 'jpy',
                routing_number: this.bank.bank_code + this.bank.branch_code,
                account_number: this.bank.account_number,
                account_holder_name: this.bank.last_name + ' ' + this.bank.first_name,
                account_holder_type: 'individual',
            })

            if(error){
                console.log(error)
                this.loading = false
            }else{
                request.patch('/api/v1/bank_account', {params: {stripe_bank_token: token.id}, auth: true})
                    .then( response => {
                        this.loading = false
                        this.stepper += 1
                        this.isBank = true
                        console.log('sucess')
                    })
                    .catch( error => {
                        this.loading = false
                        console.log(error)
                    })
            }
        }
    },
    mounted(){
        const elements = this.$stripe.elements()

        const style = {
            base: {
                fontSize: '16px',
                color: "#32325d",
            },
        }

        this.card = elements.create('card', {style, hidePostalCode: true})
        this.card.mount('#card-element')
        this.card.addEventListener('change', ({error}) => {
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

.v-stepper{
    box-shadow: initial!important;
}
</style>
