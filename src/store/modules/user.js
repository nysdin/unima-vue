import request from '../../utils/api'

const user = {
    namespaced: true,
    state: {
        user: {
            name: '',
            email: '',
            provider: '',
            uid: '',
            id: 0,
            avatar: { url: '' }
        }
    },
    getters: {
        name(state){
            return state.user.name 
        },
        email(state){
            return state.user.email
        },
        avatar(state){
            return state.user.avatar
        }
    },
    mutations: {
        setUser(state, userData){
            console.log(userData, 'userData')
            const { name, email, provider, uid, id, avatar } = userData
            console.log(name, email, provider, uid, id, avatar)
            state.user = { name, email, provider, uid, id, avatar }
            console.log(state.user)
            state.user.avatar.url = avatar.url
            console.log(state.user.avatar.url)
        },
        removeUser(state){
            const user = { name: '', email: '', provider: '', uid: '', id: 0 }
            state.user = user
        }
    },
    actions: {
        editUser({ commit }, user){
            const FD = new FormData()
            FD.append('name', user.name)
            FD.append('email', user.email)
            return new Promise( (resolve, reject) => {
                if(!user.avatar){
                    request.patch('/api/v1/auth', { params: FD, auth: true })
                        .then( response => {
                            commit('setUser', response.data.data)
                            console.log(response)
                            resolve()
                        })
                        .catch( error => {
                            console.log(error.response)
                            reject()
                        })
                }else{
                    user.avatar.generateBlob( (blob) => {
                        FD.append('avatar', blob, user.filename)
                        request.patch('/api/v1/auth', { params: FD, auth: true })
                            .then( response => {
                                commit('setUser', response.data.data)
                                console.log(response)
                                resolve()
                            })
                            .catch( error => {
                                console.log(error.response)
                                reject()
                            })
                    })
                }
            })
        }
    }
}

export default user