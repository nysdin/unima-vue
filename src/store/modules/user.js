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

    }
}

export default user