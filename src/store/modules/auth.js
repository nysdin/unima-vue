import request from '../../utils/api'

const auth = {
    namespaced: true,
    state: {
        token: localStorage.getItem('client'),
        status: '',
    },
    getters: {
        isAuthenticated(state){
            return !!state.token
        },
        //APIの状態、loading or success or error
        authStatus(state){
            return state.status
        }
    },
    mutations: {

    },
    actions: {
        login({ commit }, options){
            return new Promise( (resolve, reject) => {
                request.post(options.url, options)
                    .then( response => {
                        console.log(response.data.data)
                        commit('user/setUser', response.data.data, { root: true })
                        const headers = response.headers
                        localStorage.setItem('access-token', headers['access-token'])
                        localStorage.setItem('client', headers['client'])
                        localStorage.setItem('uid', headers['uid'])
                        resolve()
                    })
                    .catch( error => {
                        console.log(error)
                        reject()
                    })
            })
        },
        logout({ commit }, options){
            return new Promise( (resolve, reject) => {
                request.delete(options.url, options)
                    .then( response => {
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
    }
}

export default auth