<template>
    <div id="app">
        <v-app>
            <v-app-bar color="red darken-1" class="navbar">
                <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
                <v-toolbar-title class="title" @click="toTop">Unima</v-toolbar-title>
            </v-app-bar> 

            <v-navigation-drawer v-model="drawer" fixed temporary class="side-nav">
                <v-list-item>
                    <v-list-item-avatar>
                        <v-img :src="$store.state.user.user.avatar.url" class="avatar"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                    <v-list-item-title>{{$store.state.user.user.name}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

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
            </v-navigation-drawer>

            <div v-loading.fullscreen.lock="!initLoading　|| loading"
                element-loading-background="rgba(255, 255, 255, 1.0)"
            ></div>
            <router-view class="main" v-show="initLoading && !loading"/>
        </v-app>
    </div>
</template>

<script>

export default {
    data(){
        return {
        drawer: false,
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
    },
    created(){
        this.$store.dispatch('auth/initialize', localStorage.getItem('access-token'))
    },
    methods: {
        toTop(){
            this.$router.push('/')
        },
        toLink(url){
            this.$router.push(`/${url}`)
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

.main{
    margin-top: 56px;
}

.avatar{
    border: 2px solid #b9b9b9;
}

.side-nav{
    z-index: 20;
}
</style>
