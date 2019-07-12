import request from '../../utils/api'

const auth = {
    namespaced: true,
    state: {
        token: '',
        loading: true,
    },
    getters: {
        //ログインの真偽
        isAuthenticated(state){
            return !!state.token
        },
        //authenticationに関するAPIの状態、loading or success or error
        authLoading(state){
            return state.loading
        }
    },
    mutations: {
        //認証apiの通信中
        authRequest(state){
            state.loading = true
        },
        //認証api通信の完了
        authCompleted(state){
            state.loading = false
        },
        //アクセストークンのセット
        setToken(state, token){
            state.token = token
        },
        //アクセストークンを削除
        removeToken(state){
            state.token = ''
        }
    },
    actions: {
        login({ commit }, options){
            return new Promise( (resolve, reject) => {
                //api通信中に設定
                commit('authRequest')
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
                        commit('authCompleted')
                        resolve()
                    })
                    .catch( error => {
                        //認証apiの失敗
                        console.log(error)
                        commit('authCompleted')
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
        validateToken({ commit }){
            return new Promise( (resolve, reject) => {
                commit('authRequest')
                request.get('http://localhost:3000/api/v1/auth/validate_token', { auth: true })
                    .then( response => {
                        commit('setToken', response.headers['access-token'])
                        commit('user/setUser', response.data.data, { root: true })
                        commit('authCompleted')
                        resolve()
                    })
                    .catch( () => {
                        localStorage.removeItem('access-token')
                        localStorage.removeItem('client')
                        localStorage.removeItem('uid')
                        commit('authCompleted')
                        reject()
                    })
            })
        }
    }
}

export default auth