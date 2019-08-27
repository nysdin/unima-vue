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
        login({ commit }, user){
            return new Promise( (resolve, reject) => {
                //api通信中に設定
                commit('apiRequest')
                //認証api通信
                request.post('/api/v1/auth/sign_in', { params: user })
                    .then( response => {
                        console.log('53')
                        //返ってきたuser情報をstoreにセットするcommit
                        commit('user/setUser', response.data.data, { root: true })
                        console.log('56')
                        const headers = response.headers
                        console.log('58')
                        //localStorageにheadersの情報をセット
                        localStorage.setItem('access-token', headers['access-token'])
                        console.log('61')
                        localStorage.setItem('client', headers['client'])
                        localStorage.setItem('uid', headers['uid'])
                        console.log('64')
                        commit('setToken', headers['access-token'])
                        console.log('66')
                        //認証apiの成功
                        console.log('68')
                        commit('apiCompleted')
                        resolve()
                    })
                    .catch( error => {
                        //認証apiの失敗
                        //Object.keys(error).forEach( value => console.log(value))
                        commit('apiCompleted')
                        reject(error.response.data.errors)
                    })
            })
        },
        register({ commit }, user){
            return new Promise( (resolve, reject) => {
                commit('apiRequest')
                request.post('/api/v1/auth', { params: user })
                    .then(response => {
                        commit('user/setUser', response.data.data, { root: true })
                        const headers = response.headers
                        localStorage.setItem('access-token', headers['access-token'])
                        localStorage.setItem('client', headers['client'])
                        localStorage.setItem('uid', headers['uid'])
                        commit('setToken', headers['access-token'])
                        commit('apiCompleted')
                        resolve()
                    })
                    .catch( error => {
                        commit('apiCompleted')
                        reject(error.response.data.errors.full_messages)
                    })
            })
        },
        logout({ commit }){
            return new Promise( (resolve, reject) => {
                request.delete('/api/v1/auth/sign_out', {auth: true})
                    .then( response => {
                        commit('removeToken')
                        commit('user/removeUser', null, { root: true})
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
                        console.log(response)
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