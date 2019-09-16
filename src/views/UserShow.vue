<template>
    <div id="user-show">
        <v-card flat>
            <v-container class="py-0">
                <v-row>
                    <v-col :cols="4">
                        <div class="d-flex justify-center">
                            <v-avatar :size="80">
                                <img :src="user.avatar.url">
                            </v-avatar>
                        </div>
                        <p class="text-center subtitle-1 headline mb-0 mt-2">{{ user.name }}</p>
                    </v-col>
                    <v-col :cols="8">
                        <template v-if="currentUser">
                            <v-btn outlined small class="mt-4" v-if="currentUser"
                                color="primary" @click="$router.push('/u/edit')">
                                プロフィールの編集
                            </v-btn>
                        </template>
                        <template v-else>
                            <v-btn outlined small class="mt-4" v-show="!following"
                                color="primary" @click="follow"
                                :loading="loading" :disabled="loading">
                                フォローする
                            </v-btn>
                            <v-btn small class="mt-4" v-show="following"
                                color="primary" @click="unfollow"
                                :loading="loading" :disabled="loading">
                                フォロー中
                            </v-btn>
                        </template>
                        <div class="mt-4">
                            <a :href="tweetURL"
                                class="twitter-share-button">
                                <v-icon color="primary" :size="40">
                                    mdi-twitter-box
                                </v-icon>
                            </a>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
        <v-sheet tile color="grey lighten-3" height="30">
            <p class="font-weight-bold py-0 ma-0 text-center" style="line-height: 30px;">出品した商品</p>
        </v-sheet>
        <Display :products="products" />
    </div>
</template>

<script>
import request from '../utils/api.js'
import Display from '../components/Display'

export default {
    name: 'UserShow',
    components: {
        Display
    },
    data(){
        return {
            user: {
                avatar: { url: '' }
            },
            products: [],
            following: false,
            loading: false,
        }
    },
    computed: {
        currentUser(){
            return this.$store.state.user.user.id === this.user.id
        },
        mypageURL(){
            return process.env.VUE_APP_API_ENDOPINT + '/u/' + this.$route.params.id
        },
        tweetURL(){
            const url = `https://unima.netlify.com/u/${this.$route.params.id}`
            const encodedUrl = encodeURIComponent(url)
            return `https://twitter.com/intent/tweet?text=大学内フリマアプリ『Unima』で販売中！%0a&url=${url}`
        }
    },
    methods: {
        follow(){
            this.loading = true
            request.post('/api/v1/relationships', {
                params: {
                    followed_id: this.$route.params.id
                },
                auth: true
            })
                .then(response => {
                    this.following = true
                    this.loading = false
                    console.log(response)
                })
                .catch(error => {
                    this.loading = false
                    console.log(error)
                })
        },
        unfollow(){
            this.loading = true
            request.delete(`/api/v1/relationships/${this.$route.params.id}`, { auth: true })
                .then(response => {
                    this.following = false
                    this.loading = false
                    console.log(response)
                })
                .catch(error => {
                    this.loading = false
                    console.log(error)
                })
        },
    },
    mounted(){
        request.get(`/api/v1/users/${this.$route.params.id}`, { auth: true })
            .then(response => {
                const data = response.data
                this.user = data.user
                this.products = data.products
                this.following = data.following
                console.log(response)
            })
            .catch( error => {
                console.log(error.response)
            })
    }
}
</script>

<style>
.twitter-share-button{
    text-decoration: none;
}
</style>
