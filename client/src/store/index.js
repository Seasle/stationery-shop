import { createStore } from 'vuex';

export default createStore({
    state() {
        return {
            cart: {},
        };
    },
    getters: {
        cart(state) {
            return Object.keys(state.cart).map(entry => Number(entry));
        },
    },
    mutations: {
        updateCart(state, payload) {
            state.cart = payload;
        },
        updateCount(state, payload) {
            if (state.cart[payload.id] !== undefined) {
                state.cart = {
                    ...state.cart,
                    [payload.id]: payload.count,
                };
            }
        },
    },
    actions: {
        updateCart(context, payload) {
            context.commit('updateCart', payload);
        },
        updateCount(context, payload) {
            context.commit('updateCount', payload);
        },
    },
});
