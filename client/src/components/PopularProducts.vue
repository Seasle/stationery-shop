<template>
    <div class="container">
        <h2 class="container__title">Популярные товары</h2>
        <div class="container__grid">
            <template v-for="(product, index) in products" :key="index">
                <ProductCard :sales="product" />
            </template>
        </div>
    </div>
</template>

<script>
import ProductCard from '@/components/ProductCard';

export default {
    name: 'PopularProducts',
    components: {
        ProductCard,
    },
    data() {
        return {
            products: new Array(40)
                .fill(null)
                .map(() => 5 + Math.floor(Math.random() * 50))
                .sort((a, b) => b - a),
        };
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
