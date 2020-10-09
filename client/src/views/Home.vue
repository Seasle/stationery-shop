<template>
    <MiniCatalog />
    <PopularProducts />
</template>

<script>
import MiniCatalog from '@/components/MiniCatalog.vue';
import PopularProducts from '@/components/PopularProducts.vue';

export default {
    name: 'Home',
    components: {
        MiniCatalog,
        PopularProducts,
    },
};
</script>
