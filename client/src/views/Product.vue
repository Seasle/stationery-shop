<template>
    <ProductInfo :id="$route.params.id" />
</template>

<script>
import ProductInfo from '@/components/ProductInfo.vue';

export default {
    name: 'Catalog',
    components: {
        ProductInfo,
    },
};
</script>
