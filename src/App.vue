<template>
    <div id="app">
        <v-app>
            <v-app-bar :elevation="0" hide-on-scroll fixed>
                <template v-if="searched">
                    <v-icon @click="searched = false">mdi-arrow-left-thick</v-icon>
                    <v-text-field placeholder="商品を検索"
                        hide-details single-line v-model="keyword">
                    </v-text-field>
                    <v-btn icon @click="search" :key="0">
                        <v-icon>search</v-icon>
                    </v-btn>
                </template>
                <template v-else>
                    <v-toolbar-title class="title px-0" @click="toTop">Unima</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon class="mr-1" :key="1">
                        <v-icon @click="searched = true">search</v-icon>
                    </v-btn>
                    <v-btn icon class="mr-1">
                        <v-icon @click="$router.push('/sell')">mdi-camera-plus</v-icon>
                    </v-btn>
                    <v-btn icon @click="$router.push('/mypage')" v-if="isLoggedIn">
                        <v-avatar :size="42">
                            <v-img :src="$store.state.user.user.avatar.url" class="avatar"></v-img>
                        </v-avatar>
                    </v-btn>
                    <v-btn v-if="!isLoggedIn" x-small :elevation="0" 
                    class="mr-1" outlined :minHeight="30"
                    @click="$router.push('/register')">新規登録</v-btn>
                    <v-btn v-if="!isLoggedIn" x-small :elevation="0" 
                    outlined :minHeight="30" @click="$router.push('/login')">ログイン</v-btn>
                </template>
            </v-app-bar>

            <div v-loading.fullscreen.lock="!initLoading　|| loading"
                element-loading-background="rgba(255, 255, 255, 1.0)"
            ></div>
            <router-view class="main" v-show="initLoading && !loading"/>
        </v-app>

            <!-- <v-navigation-drawer v-model="drawer" fixed temporary class="side-nav overflow-hidden">
                <template v-if="isLoggedIn">
                    <v-list-item>
                        <v-list-item-avatar>
                            <v-img :src="$store.state.user.user.avatar.url" class="avatar"></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>{{$store.state.user.user.name}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
                <template v-else>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>Unima</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>

                <v-divider></v-divider>

                <v-list dense>
                    <v-list-item v-for="menu in menus" :key="menu.title" link @click="toLink(menu.url)">
                    <v-list-item-icon>
                        <v-icon>{{ menu.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ menu.title }}</v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                </v-list>

                <template v-slot:append v-if="isLoggedIn"> 
                    <div class="pa-2">
                        <v-btn block :elevation="2" @click="logout">Logout</v-btn>
                    </div>
                </template>

            </v-navigation-drawer> -->
    </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'

export default {
    data(){
        return {
            drawer: false,
            searched: false,
            keyword: '',
            menus: [
                { title: 'アカウント', icon: 'mdi-account', url: 'mypage'},
                { title: '出品', url: 'sell'},
            ]
        }
    },
    computed: {
        initLoading(){
            return this.$store.getters['auth/init']
        },
        loading(){
            return this.$store.getters['auth/loading']
        },
        isLoggedIn(){
            return !!this.$store.state.auth.token
        }
    },
    created(){
        this.$store.dispatch('auth/initialize', localStorage.getItem('access-token'))
    },
    methods: {
        toTop(){
            this.$router.push('/')
        },
        search(){
            this.$router.push({ path: '/search', query: {keyword: this.keyword} })
            this.keyword = ''
            this.searched = false
        }
    }
}
</script>


<style>
#app {
    color: #2c3e50;
}

.title{
    cursor: pointer;
}

.navbar{
    position: fixed!important;
    z-index: 1;
}

.avatar{
    border: 2px solid #b9b9b9;
}

.side-nav{
    z-index: 20;
}

.overflow-y-hidden{
    overflow-y: hidden;
}
</style>
