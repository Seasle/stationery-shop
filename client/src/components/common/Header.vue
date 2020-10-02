<template>
    <header class="header">
        <h1 class="header__title">Канцелярские товары</h1>
        <Navigation />
    </header>
</template>

<script>
import Navigation from './Navigation';

export default {
    name: 'Header',
    components: {
        Navigation,
    },
};
</script>

<style lang="scss" scoped>
.header {
    padding: 0 24px;
    gap: 24px;
    display: grid;
    grid-template-columns: max-content 1fr;
    align-items: center;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1),
                0 2px 4px 0 rgba(0, 0, 0, 0.05);
    z-index: 2;

    &__title {
        margin: 0;
    }
}
</style>
