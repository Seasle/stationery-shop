<template>
    <span class="visually-hidden">{{ value }} тенге</span>
    <span aria-hidden="true">{{ prettyValue }} <span class="currency">₸</span></span>
</template>

<script>
export default {
    name: 'Price',
    props: {
        value: Number
    },
    computed: {
        prettyValue() {
            return this.value?.toLocaleString('ru-RU')
        },
    },
};
</script>

<style lang="scss" scoped>
.currency {
    font-size: 0.6em;
}
</style>
