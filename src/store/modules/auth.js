import request from '../../utils/api'

const auth = {
    namespaced: true,
    state: {
        token: '',
        loading: true,
        init: false
    },
    getters: {
        //ログインの真偽
        isAuthenticated(state){
            return !!state.token
        },
        //APIの通信中かどうか
        loading(state){
            return state.loading
        },
        //初期表示のフラグ
        init(state){
            return state.init
        }
    },
    mutations: {
        //apiの通信中
        apiRequest(state){
            state.loading = true
        },
        //api通信の完了
        apiCompleted(state){
            state.loading = false
        },
        //アクセストークンのセット
        setToken(state, token){
            state.token = token
        },
        //アクセストークンを削除
        removeToken(state){
            state.token = ''
        },
        initialized(state){
            state.init = true
        }
    },
    actions: {
        login({ commit }, options){
            return new Promise( (resolve, reject) => {
                //api通信中に設定
                commit('apiRequest')
                //認証api通信
                request.post(options.url, options)
                    .then( response => {
                        //返ってきたuser情報をstoreにセットするcommit
                        commit('user/setUser', response.data.data, { root: true })
                        const headers = response.headers
                        //localStorageにheadersの情報をセット
                        localStorage.setItem('access-token', headers['access-token'])
                        localStorage.setItem('client', headers['client'])
                        localStorage.setItem('uid', headers['uid'])
                        commit('setToken', headers['access-token'])
                        //認証apiの成功
                        commit('apiCompleted')
                        resolve()
                    })
                    .catch( error => {
                        //認証apiの失敗
                        console.log(error)
                        commit('apiCompleted')
                        reject()
                    })
            })
        },
        logout({ commit }, options){
            return new Promise( (resolve, reject) => {
                request.delete(options.url, options)
                    .then( response => {
                        commit('removeToken')
                        localStorage.removeItem('access-token')
                        localStorage.removeItem('client')
                        localStorage.removeItem('uid')
                        resolve()
                    })
                    .catch( error => {
                        console.log(error)
                        reject()
                    })
            }) 
        },
        //認証トークンが有効か期限切れでないかを確認
        initialize({ commit }, token){
            if(token){
                commit('apiRequest')
                request.get('/api/v1/auth/validate_token', { auth: true })
                    .then( response => {
                        commit('setToken', response.headers['access-token'])
                        commit('user/setUser', response.data.data, { root: true })
                        commit('initialized')
                        commit('apiCompleted')
                    })
                    .catch( () => {
                        localStorage.removeItem('access-token')
                        localStorage.removeItem('client')
                        localStorage.removeItem('uid')
                        commit('initialized')
                        commit('apiCompleted')
                    })
            }else{
                commit('initialized')
                commit('apiCompleted')
            }
        }
    }
}

export default auth