<template>
    <div id="app" v-bind:class="{ overflowYHidden: drawer }">
        <v-app>
            <v-card :elevation="0" color="#FAFAFA">
                <v-app-bar hide-on-scroll fixed　:elevation="0">
                    <template v-if="!searched">
                        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
                        <v-toolbar-title class="title" @click="toTop">Unima</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                            <v-icon @click="searched = !searched">search</v-icon>
                        </v-btn>
                    </template>
                    <template v-if="searched">
                        <v-icon @click="searched = !searched">mdi-arrow-left-thick</v-icon>
                            <v-text-field placeholder="商品を検索" append-icon="search"
                                hide-details single-line></v-text-field>
                    </template>
                </v-app-bar>
                <div v-loading.fullscreen.lock="!initLoading　|| loading"
                    element-loading-background="rgba(255, 255, 255, 1.0)"
                ></div>
                <router-view class="main" v-show="initLoading && !loading"/>
            </v-card>
            

            <v-navigation-drawer v-model="drawer" fixed temporary class="side-nav overflow-hidden">
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

            
        </v-app>
    </div>
</template>

<script>

export default {
    data(){
        return {
            drawer: false,
            searched: false,
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

.overflow-y-hidden{
    overflow-y: hidden;
}
</style>
