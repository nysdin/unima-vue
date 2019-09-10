<template>
    <div id="register-container">

        <v-stepper v-model="stepper" vertical>
            <v-stepper-step :complete="stepper > 1" step="1" editable>
                会員情報　<small>アカウントの詳細情報</small>
            </v-stepper-step>

            <v-stepper-content step="1">
                <v-card >
                    <v-form>
                        <v-text-field v-model="user.name" label="ニックネーム" placeholder="アカウント名" required></v-text-field>
                        <v-text-field v-model="user.email" label="メールアドレス" placeholder="test@example.com" required></v-text-field>
                        <v-text-field v-model="user.password" :append-icon="show1 ? 'visibility' : 'visibility_off'"
                        label="パスワード" required :type="show1 ? 'text' : 'password'" placeholder="6文字以上"
                        @click:append="show1 = !show1"></v-text-field>
                        <v-text-field v-model="user.password_confirmation" :append-icon="show2 ? 'visibility' : 'visibility_off'"
                        label="パスワード（確認）" required :type="show2 ? 'text' : 'password'" placeholder="6文字以上"
                        @click:append="show2 = !show2"></v-text-field>

                        <v-btn medium @click="stepper = 2" color="primary">次へ進む</v-btn>
                    </v-form>
                </v-card>
            </v-stepper-content>

            <v-stepper-step :complete="stepper > 2" step="2" editable>
                本人確認情報　<small>決済に関する必要な情報</small>
            </v-stepper-step>

            <v-stepper-content step="2">
                <v-card>
                    <v-form>
                        <v-row>
                            <v-col :cols="6">
                                <v-text-field v-model="individual.last_name_kanji" label="苗字（漢字）" placeholder="山田" required></v-text-field>
                            </v-col>
                            <v-col :cols="6">
                                <v-text-field v-model="individual.first_name_kanji" label="名前（漢字）" placeholder="太朗" required></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col :cols="6">
                                <v-text-field v-model="individual.last_name_kana" label="苗字（カナ）" placeholder="ヤマダ" required></v-text-field>
                            </v-col>
                            <v-col :cols="6">
                                <v-text-field v-model="individual.first_name_kana" label="名前（カナ）" placeholder="タロウ" required></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col :cols="6">
                                <v-text-field v-model="phone" label="電話番号(ハイフンなし)" placeholder="09012345678" required></v-text-field>
                            </v-col>
                            <v-col :cols="6">
                                <v-select v-model="individual.gender" label="性別"
                                :items="[{text: '男', value: 'male'}, {text:'女', value:'female'}]"></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col :cols="4">
                                <v-text-field v-model="individual.dob.year" label="生年月日（年）" placeholder="2000"></v-text-field>
                            </v-col>
                            <v-col :cols="4">
                                <v-text-field v-model="individual.dob.month" label="生年月日（月）" placeholder="1"></v-text-field>
                            </v-col>
                            <v-col :cols="4">
                                <v-text-field v-model="individual.dob.day" label="生年月日（日）" placeholder="1"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-text-field v-model="individual.address_kanji.postal_code" label="郵便番号(ハイフンなし)" placeholder="1500001" required></v-text-field>
                        <v-text-field v-model="individual.address_kanji.state" label="都道府県名" placeholder="東京都" required></v-text-field>
                        <v-text-field v-model="individual.address_kana.state" label="都道府県名（カナ）" placeholder="トウキョウト" required></v-text-field>
                        <v-text-field v-model="individual.address_kanji.city" label="市区町村" placeholder="渋谷区" required></v-text-field>
                        <v-text-field v-model="individual.address_kana.city" label="市区町村（カナ）" placeholder="シブヤク" required></v-text-field>
                        <v-text-field v-model="individual.address_kanji.town" label="町名(丁目まで)" placeholder="神宮前　１丁目" required></v-text-field>
                        <v-text-field v-model="individual.address_kana.town" label="町名(カナ）" placeholder="ジングウマエ　1-" required></v-text-field>
                        <v-text-field v-model="individual.address_kanji.line1" label="番地、号" placeholder="5-8" required></v-text-field>
                        <v-text-field v-model="individual.address_kana.line1" label="番地、号（カナ）" placeholder="5-8" required></v-text-field>
                        <v-text-field v-model="individual.address_kanji.line2" label="建物・部屋番号・その他" placeholder="神宮前タワービルディング22F" required></v-text-field>
                        <v-text-field v-model="individual.address_kana.line2" label="建物・部屋番号・その他（カナ）" placeholder="ジングウマエタワービルディングﾞ22F" required></v-text-field>

                        <v-btn medium @click="stepper = 3" color="primary">次へ進む</v-btn>
                        <v-btn medium @click="stepper = 1" class="ml-2" text>戻る</v-btn>
                    </v-form>
                </v-card>

            </v-stepper-content>

            <v-stepper-step step="3" :complete="stepper > 3" editable>
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

                    <v-btn small @click="createCregitToken" color="primary" >次へ進む</v-btn>
                    <v-btn small @click="stepper = 2" class="ml-2" text>戻る</v-btn>
                    <v-btn small @click="stepper = 4" color="primary" class="ml-2" >スキップする</v-btn>
                </v-card>

            </v-stepper-content>

            <v-stepper-step step="4" :complete="stepper > 4" editable>
                銀行口座 <small>売上金の振込先情報</small>
            </v-stepper-step>

            <v-stepper-content step="4">
                <v-card>
                    <p class="caption">※こちらの入力をスキップしてアカウント登録後設定することもできます。</p>
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
                        
                        <v-btn small @click="createBankAccount" color="primary" >次へ進む</v-btn>
                        <v-btn small @click="stepper = 3" class="ml-2" text>戻る</v-btn>
                        <v-btn small @click="stepper = 5" color="primary" class="ml-2" >スキップする</v-btn>
                    </v-form>
                </v-card>

            </v-stepper-content>

            <v-stepper-step step="5">
                利用規約
            </v-stepper-step>

            <v-stepper-content step="5">
                <v-card :elevation="0">
                    <p>
                        Unimaにおける出品者向けの支払処理サービスは、Stripeが提供し、
                        <a href="https://stripe.com/jp/connect-account/legal">Stripe Connectアカウント契約</a>
                        (<a href="https://stripe.com/jp/legal">Stripe利用規約</a>を含み、総称して「Stripeサービス契約」といいます。）
                        に従うものとします。[本契約、本条件等]への同意又はUnimaにおいて取引関係者としての取引の継続により、
                        お客様はStripeサービス契約（随時Stripeにより修正されることがあり、その場合には修正されたものを含みます。）
                        に拘束されることに同意するものとします。 Stripeを通じた支払処理サービスをUnimaができるようにするための条件
                        として、お客様は、Unimaに対してお客様及びお客様の事業に関する正確かつ完全な情報を提供することに同意し、
                        Unimaが当該情報及びStripeが提供する支払処理サービスの
                        お客様による使用に関連する取引情報を共有することを認めるものとします。
                    </p>

                    <div class="d-flex justify-center">
                        <v-btn medium color="primary" @click="register" :loading="loading" :disabled="loading">アカウントを登録</v-btn>
                        <v-btn medium @click="stepper = 3" class="ml-2" text>戻る</v-btn>
                    </div>
                    <p class="text-center caption mt-3">
                        アカウントを登録すると、本サービス契約と
                        <a href="https://stripe.com/jp/connect-account/legal">Stripe Connectアカウント契約</a>
                        に同意したことになります。
                    </p>
                </v-card>
            </v-stepper-content>
    </v-stepper>
    </div>
</template>

<script>
export default {
    name: 'Register',
    data() {
        return {
            card: null,
            stepper: 1,
            show1: false,
            show2: false,
            loading: false,
            user: {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                stripe_cregit_token: '',
                stripe_bank_token: '',
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
        }
    },
    methods: {
        async register(){
            this.loading = true
            this.individual.address_kana.postal_code = this.individual.address_kanji.postal_code
            this.individual.phone = '+81' + this.phone
            this.$store.dispatch('auth/register', { ...this.user, ...this.individual })
                .then( () => {
                    this.loading = false
                    this.$router.push('/')
                })
                .catch( errors => {
                    this.loading = false
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
        async createCregitToken(){
            const {token, error} = await this.$stripe.createToken(this.card)
            if (error) {
                // Inform the customer that there was an error.
                const errorElement = document.getElementById('card-errors')
                errorElement.textContent = error.message
            } else {
                // Send the token to your server.
                this.stepper = 4
                this.user.stripe_cregit_token = token.id
            }
        },
        async createBankAccount(){
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
            }else{
                this.stepper = 5
                this.user.stripe_bank_token = token.id
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
.avatar{
    border-radius: 50%;
    cursor: pointer;
}
</style>
