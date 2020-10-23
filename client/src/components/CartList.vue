<template>
    <div class="cart">
        <template v-if="cart.length > 0">
            <CartItem
                v-for="item in cart"
                :id="item.id"
                :count="item.count"
                :key="item.id"
            />
        </template>
        <template v-if="cart.length === 0">
            <p class="cart__text">Извините, но тут ничего нет.</p>
        </template>
    </div>
</template>

<script>
import CartItem from '@/components/CartItem.vue';

export default {
    name: 'CartList',
    components: {
        CartItem,
    },
    computed: {
        cart() {
            return Object.entries(this.$store.state.cart).map(([id, count]) => ({ id, count }));
        }
    }
};
</script>

<style lang="scss" scoped>
.cart {
    padding: 24px 96px;
    gap: 24px;
    display: grid;
    grid-auto-rows: max-content;

    &__text {
        font-weight: 500;
        font-size: 48px;
        text-align: center;
    }
}
</style>
