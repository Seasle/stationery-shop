<template>
    <div class="container">
        <h2 class="container__title">Популярные товары</h2>
        <div class="container__grid">
            <template v-for="(product, index) in products" :key="index">
                <ProductCard :data="product" :sales="product.sales" />
            </template>
        </div>
    </div>
</template>

<script>
import { ref, watchEffect } from 'vue';
import ProductCard from '@/components/ProductCard';
import { get } from '@/api';

export default {
    name: 'PopularProducts',
    components: {
        ProductCard,
    },
    setup() {
        const products = ref([]);

        return {
            products,
        };
    },
    mounted() {
        watchEffect(onInvalidate => {
            const [response, controller] = get('products/popular');

            response.then(response => {
                if (response?.statusCode === 404) {
                    this.products = [];
                } else {
                    this.products = response;
                }
            });

            onInvalidate(() => {
                controller.abort();
            });
        });
    },
};
</script>

<style lang="scss" scoped>
.container {
    padding: 24px;
    gap: 24px;
    display: grid;
    grid-auto-rows: max-content;

    &__title {
        font-size: 4rem;
    }

    &__grid {
        gap: 24px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);

        @media screen and (max-width: 1280px) {
            grid-template-columns: repeat(3, 1fr);
        }

        @media screen and (max-width: 1024px) {
            grid-template-columns: repeat(2, 1fr);
        }
    }
}
</style>
