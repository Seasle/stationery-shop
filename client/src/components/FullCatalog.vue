<template>
    <main class="container">
        <h2 class="container__title">{{ title }}</h2>
        <div class="container__grid">
            <template v-for="(product, index) in products" :key="index">
                <ProductCard :data="product" />
            </template>
        </div>
    </main>
</template>

<script>
import { ref, watchEffect } from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import Catalogs from '@/constants/Catalogs.js';
import { get } from '@/api';

export default {
    name: 'FullCatalog',
    props: {
        size: {
            type: Number,
            required: true,
        },
    },
    components: {
        ProductCard,
    },
    setup() {
        const page = ref(0);
        const products = ref([]);

        return {
            page,
            products,
        };
    },
    mounted() {
        watchEffect(onInvalidate => {
            const [response, controller] = get(`products/${this.$route.params.id}`);

            response.then(data => {
                if (data?.statusCode === 404) {
                    this.products = [];
                } else {
                    this.products = data;
                }
            });

            onInvalidate(() => {
                controller.abort();
            });
        });
    },
    computed: {
        title() {
            const id = Number(this.$route.params.id);
            const catalog = Catalogs.find(catalog => catalog.key === id);

            return catalog.text;
        }
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
        font-size: 6rem;
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
