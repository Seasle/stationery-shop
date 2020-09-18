<template>
    <div class="container">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'Container',
};
</script>

<style lang="scss" scoped>
.container {
    margin: -24px;
}
</style>
