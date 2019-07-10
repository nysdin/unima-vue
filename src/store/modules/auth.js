import request from '../../utils/api'

const auth = {
    namespaced: true,
    state: {
        
    },
    getters: {

    },
    mutations: {

    },
    actions: {
        login({ commit }, options){
            return new Promise( (resolve, reject) => {
                request.post(options.url, options)
                    .then( response => {
                        console.log(response)
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