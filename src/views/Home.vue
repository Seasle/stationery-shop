<template>
    <Catalog />
    <PopularProducts />
</template>

<script>
import Catalog from '@/components/Catalog.vue';
import PopularProducts from '@/components/PopularProducts.vue';

export default {
    name: 'Home',
    components: {
        Catalog,
        PopularProducts,
    },
};
</script>
