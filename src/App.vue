<template>
    <div id="app">
        <v-app>
            <v-app-bar color="red darken-1" class="navbar">
                <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
                <v-toolbar-title class="title" @click="toTop">Unima</v-toolbar-title>
            </v-app-bar> 

            <v-navigation-drawer v-model="drawer" fixed temporary  >
                <v-list-item>
                    <v-list-item-avatar>
                        <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                    <v-list-item-title>John Leider</v-list-item-title>
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

            <v-container>
                <div v-loading.fullscreen.lock="!initLoading　|| loading"
                    element-loading-background="rgba(255, 255, 255, 1.0)" class="main"
                ></div>
                <router-view v-show="initLoading && !loading"/>
            </v-container>
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
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.title{
    cursor: pointer;
}

.navbar{
    position: fixed!important;
}

.main{
    margin-top: 60px;
}
</style>
