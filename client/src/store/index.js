import { createStore } from 'vuex';

export default createStore({
    state() {
        return {
            cart: [],
        };
    },
    mutations: {
        updateCart(state, payload) {
            state.cart = payload;
        },
    },
    actions: {
        updateCart(context, payload) {
            context.commit('updateCart', payload);
        },
    },
});
