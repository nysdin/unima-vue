import request from '../../utils/api'

const auth = {
    namespaced: true,
    state: {
        token: '',
        status: '',
    },
    getters: {
        //ログインの真偽
        isAuthenticated(state){
            return !!state.token
        },
        //authenticationに関するAPIの状態、loading or success or error
        authStatus(state){
            return state.status
        }
    },
    mutations: {
        //認証apiの通信中
        authRequest(state){
            state.status = 'loading'
        },
        //認証apiの成功
        authSuccess(state){
            state.status = 'success'
        },
        //認証apiの失敗
        authError(state){
            state.status = 'error'
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
                        commit('authSuccess')
                        resolve()
                    })
                    .catch( error => {
                        //認証apiの失敗
                        commit('authError')
                        console.log(error)
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
                request.get('http://localhost:3000/api/v1/auth/validate_token', { auth: true })
                    .then( response => {
                        commit('setToken', response.headers['access-token'])
                        commit('user/setUser', response.data.data, { root: true })
                        resolve()
                    })
                    .catch( () => {
                        localStorage.removeItem('access-token')
                        localStorage.removeItem('client')
                        localStorage.removeItem('uid')
                        reject()
                    })
            })
        }
    }
}

export default auth