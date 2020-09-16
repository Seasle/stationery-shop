<template>
    <router-link
        class="link"
        exact-active-class="link--active"
        to="/"
        exact
    >
        <slot />
    </router-link>
</template>

<style lang="scss" scoped>
.link {
    padding: 12px 24px;
    display: block;
    color: #111111;

    &--active {
        text-decoration: none;
        background: var(--primary-color);
    }
}
</style>
