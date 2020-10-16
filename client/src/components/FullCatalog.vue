<template>
    <main class="container">
        <h2 class="container__title">{{ title }} - {{ total }}</h2>
        <div class="container__grid">
            <template v-for="(product, index) in products" :key="index">
                <ProductCard :data="product" />
            </template>
        </div>
        <div class="container__buttons">
            <button class="container__button" @click="previousPage" :disabled="!hasPrevious">
                <IconBase viewBox="0 0 492 492">
                    <LeftArrowIcon />
                </IconBase>
                Сюда
            </button>
            <button class="container__button" @click="nextPage" :disabled="!hasNext">
                Туда
                <IconBase viewBox="0 0 492 492">
                    <RightArrowIcon />
                </IconBase>
            </button>
        </div>
    </main>
</template>

<script>
import { ref, watchEffect } from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import IconBase from '@/components/IconBase.vue';
import { LeftArrowIcon, RightArrowIcon } from '@/components/icons';
import Catalogs from '@/constants/Catalogs.js';
import { get } from '@/api';

const PAGE_SIZE = 8;

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
        IconBase,
        LeftArrowIcon,
        RightArrowIcon,
    },
    setup() {
        const page = ref(0);
        const total = ref(0);
        const products = ref([]);

        return {
            page,
            total,
            products,
        };
    },
    mounted() {
        watchEffect(onInvalidate => {
            const [response, controller] = get(`products/${this.$route.params.id}?page=${this.page}`);

            response.then(response => {
                if (response?.statusCode === 404) {
                    this.total = 0;
                    this.products = [];
                } else {
                    this.total = response.total;
                    this.products = response.data;
                }
            });

            onInvalidate(() => {
                controller.abort();
            });
        }, { flush: 'post' });
    },
    computed: {
        title() {
            const id = Number(this.$route.params.id);
            const catalog = Catalogs.find(catalog => catalog.key === id);

            return catalog.text;
        },
        pages() {
            return Math.ceil(this.total / PAGE_SIZE);
        },
        hasPrevious() {
            return this.page > 0;
        },
        hasNext() {
            return this.page < this.pages - 1;
        },
    },
    methods: {
        previousPage() {
            this.page = this.page - 1;
        },
        nextPage() {
            this.page = this.page + 1;
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

    &__buttons {
        gap: 24px;
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: max-content;
    }

    &__button {
        padding: 12px 16px;
        gap: 12px;
        border: none;
        border-radius: 4px;
        justify-self: start;
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: max-content;
        align-items: center;
        font-weight: 600;
        font-size: 24px;
        font-family: inherit;
        background: #ffffff;
        color: #111111;
        transition: background-color 0.1s ease-in-out;

        &[disabled] {
            opacity: 0.35;
        }

        &:focus {
            outline: none;

            &.focus-visible {
                text-decoration: underline;
            }
        }

        &:active {
            background: var(--primary-color);
        }
    }
}
</style>
