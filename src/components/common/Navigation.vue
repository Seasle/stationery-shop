<template>
    <nav class="nav">
        <RouterLink to="/">Главная</RouterLink>
        <RouterLink to="/cart">Корзина</RouterLink>
    </nav>
</template>

<script>
import RouterLink from './RouterLink.vue';

export default {
    name: 'Navigation',
    components: {
        RouterLink,
    },
};
</script>

<style lang="scss" scoped>
.nav {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: max-content;
}
</style>
