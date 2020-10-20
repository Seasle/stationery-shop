<template>
    <router-link
        class="link"
        exact-active-class="link--active"
        to="/"
        exact
    >
        <span class="link__text">
            <slot name="text" />
        </span>
        <slot name="badge" />
    </router-link>
</template>

<style lang="scss" scoped>
.link {
    $parent: &;

    padding: 12px 24px;
    gap: 12px;
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    align-items: center;
    text-decoration: none;
    color: #111111;

    &__text {
        line-height: 1.25;
        text-decoration: underline;
    }

    &--active {
        background: var(--primary-color);

        #{$parent}__text {
            text-decoration: none;
        }
    }
}
</style>
