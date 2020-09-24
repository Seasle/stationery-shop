<template>
    <div class="wrapper">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'Wrapper',
};
</script>

<style lang="scss" scoped>
.wrapper {
    height: 100%;
}
</style>
