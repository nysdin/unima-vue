import request from '../../utils/api'

const user = {
    namespaced: true,
    state: {
        user: {
            name: '',
            email: '',
            provider: '',
            client: '',
            uid: '',
            id: 0,
        }
    },
    getters: {
        name(state){
            return state.user.name 
        },
        email(state){
            return state.user.email
        }
    },
    mutations: {
        setUser(state, userData){
            const { name, email, provider, client, uid, id } = userData
            state.user = { name, email, provider, client, uid, id }
        },
        removeUser(state){
            const user = { name: '', email: '', provider: '', client: '', uid: '', id: 0 }
            state.user = user
        }
    },
    actions: {
        editUser({ commit }, user){
            return new Promise( (resolve, reject) => {
                request.patch('/api/v1/auth', { params: { ...user }, auth: true })
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
    }
}

export default user