const user = {
    namespaced: true,
    state: {
        user: {
            name: '',
            email: '',
            provider: '',
            uid: '',
            id: 0,
        }
    },
    getters: {

    },
    mutations: {
        setUser(state, userData){
            const { name, email, provider, uid, id } = userData
            state.user = { name, email, provider, uid, id }
        }
    },
    actions: {

    }
}

export default user