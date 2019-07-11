const user = {
    namespaced: true,
    state: {
        user: {
            name: '',
            email: '',
            provider: '',
            uid: '',
        }
    },
    getters: {

    },
    mutations: {
        setUser(state, userData){
            const { name, email, provider, uid } = userData
            state.user = { name, email, provider, uid }
        }
    },
    actions: {

    }
}

export default user