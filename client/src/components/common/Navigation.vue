<template>
    <nav class="nav">
        <RouterLink to="/">
            <template v-slot:text>Главная</template>
        </RouterLink>
        <RouterLink to="/cart">
            <template v-slot:text>Корзина</template>
            <template v-slot:badge>
                <span class="nav__badge" v-if="cartNotEmpty">{{ cartSize }}</span>
            </template>
        </RouterLink>
    </nav>
</template>

<script>
import RouterLink from './RouterLink.vue';

export default {
    name: 'Navigation',
    components: {
        RouterLink,
    },
    computed: {
        cartSize() {
            return Object.keys(this.$store.state.cart).length;
        },
        cartNotEmpty() {
            return this.cartSize !== 0;
        },
    },
};
</script>

<style lang="scss" scoped>
.nav {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: max-content;

    &__badge {
        width: 28px;
        height: 28px;
        margin: -4px 0;
        padding: 4px;
        box-sizing: border-box;
        border-radius: 50%;
        text-align: center;
        font-size: 14px;
        line-height: 18px;
        background: #111111;
        color: #ffffff;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
</style>
