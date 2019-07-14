import request from '../../utils/api.js'

const product = {
    namespaced: true,
    state: {
        products: []
    },
    getters: {

    },
    mutations: {
        setProducts(state, products){
            state.products = products
        }
    },
    actions: {
        setProducts({ commit }){
            request.get('http://localhost:3000/api/v1/products', {})
                .then( response => {
                    commit('setProducts', response.data)
                })
        }
    }
}

export default product