<template>
    <div class="catalog">
        <div class="catalog__menu">
            <button
                class="catalog__button"
                :class="{ 'catalog__button--active': selectedCatalog === catalog.key }"
                v-for="catalog in catalogs"
                @click="() => setCatalog(catalog.key)"
                :key="catalog.key"
            >
                <IconBase class="catalog__button-icon" v-if="catalog.icon" width="20" height="20">
                    <component :is="catalog.icon" />
                </IconBase>
                {{ catalog.text }}
            </button>
        </div>
        <div class="catalog__content">
            <h2 class="catalog__title">Каталог</h2>
            <div class="catalog__grid">
                <ProductCard v-for="(product, index) in products" :data="product" :key="index" />
            </div>
            <router-link class="catalog__link" :to="catalogURL">Показать еще</router-link>
        </div>
    </div>
</template>

<script>
import { ref, watchEffect } from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import IconBase from '@/components/IconBase.vue';
import Catalog from '@/constants/Catalog.js';
import Catalogs from '@/constants/Catalogs.js';
import { get } from '@/api';

export default {
    name: 'MiniCatalog',
    components: {
        ProductCard,
        IconBase,
    },
    setup() {
        const selectedCatalog = ref(Catalog.Notebooks);
        const products = ref([]);

        watchEffect(onInvalidate => {
            const [response, controller] = get(`products/${selectedCatalog.value}/top`);

            response.then(data => {
                if (data?.statusCode === 404) {
                    products.value = [];
                } else {
                    products.value = data;
                }
            });

            onInvalidate(() => {
                controller.abort();
            });
        }, { flush: 'post' });

        return {
            selectedCatalog,
            products,
        };
    },
    data() {
        return {
            catalogs: Catalogs,
        };
    },
    computed: {
        catalogURL() {
            return `/catalog/${this.selectedCatalog}`;
        },
    },
    methods: {
        setCatalog(catalog) {
            this.selectedCatalog = catalog;
        },
    },
};
</script>

<style lang="scss" scoped>
.catalog {
    display: grid;
    grid-template-columns: 320px 1fr;
    overflow: hidden;

    @media screen and (max-width: 800px) {
        grid-template-rows: max-content 1fr;
        grid-template-columns: 1fr;
    }

    &__menu {
        padding: 8px;
        gap: 8px;
        display: grid;
        grid-auto-rows: max-content;
        background: #111111;
        box-shadow: 1px 0 2px 0 rgba(0, 0, 0, 0.1), 2px 0 4px 0 rgba(0, 0, 0, 0.05);
        overflow: auto;
        z-index: 2;
    }

    &__content {
        position: relative;
        padding: 24px;
        gap: 24px;
        display: grid;
        grid-auto-rows: max-content;
        z-index: 1;

        &::before {
            position: absolute;
            width: 100%;
            height: 100%;
            background: url(../assets/hero.jpg), #eeeeee;
            background-size: cover;
            animation: color-rotate 30s infinite linear;
            content: '';
            z-index: -1;
        }
    }

    &__title {
        font-size: 6rem;
        opacity: 0.75;
    }

    &__grid {
        gap: 24px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: max-content;

        @media screen and(max-width: 1440px) {
            grid-template-columns: repeat(2, 1fr);
        }

        @media screen and (max-width: 1024px) {
            grid-template-columns: 1fr;
        }
    }

    &__button {
        padding: 12px 16px;
        border: none;
        border-radius: 4px;
        display: flex;
        align-items: center;
        font: inherit;
        text-align: left;
        background: transparent;
        color: #ffffff;
        transition: background-color 0.1s ease-in-out, color 0.1s ease-in-out,
            box-shadow 0.1s ease-in-out;

        &:focus {
            outline: none;

            &.focus-visible {
                text-decoration: underline;
            }
        }

        &:hover {
            background: rgba(255, 255, 255, 0.1);
        }

        &--active {
            background: #ffffff;
            color: #111111;
            box-shadow: 0 1px 2px 0 rgba(255, 255, 255, 0.2),
                        0 2px 4px 0 rgba(255, 255, 255, 0.15),
                        0 4px 8px 0 rgba(255, 255, 255, 0.1),
                        0 8px 16px 0 rgba(255, 255, 255, 0.05);

            &:hover {
                background: #ffffff;
                box-shadow: 0 1px 2px 0 rgba(255, 255, 255, 0.25),
                            0 2px 4px 0 rgba(255, 255, 255, 0.2),
                            0 4px 8px 0 rgba(255, 255, 255, 0.15),
                            0 8px 16px 0 rgba(255, 255, 255, 0.1),
                            0 16px 32px 0 rgba(255, 255, 255, 0.05);
            }
        }

        &-icon {
            margin-right: 8px;
            transition: fill 0.1s ease-in-out;
        }
    }

    &__link {
        padding: 12px 16px;
        border-radius: 4px;
        justify-self: start;
        font: inherit;
        text-decoration: none;
        background: #ffffff;
        color: #111111;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15),
                    0 2px 4px 0 rgba(0, 0, 0, 0.1),
                    0 4px 8px 0 rgba(0, 0, 0, 0.05);
        transition: background-color 0.1s ease-in-out,
                    color 0.1s ease-in-out,
                    box-shadow 0.1s ease-in-out;

        &:focus {
            outline: none;

            &.focus-visible {
                text-decoration: underline;
            }
        }

        &[href]:hover {
            background: var(--primary-color);
        }
    }
}

.item-title {
    padding: 24px 0;
}

@keyframes color-rotate {
    0% {
        filter: hue-rotate(0deg);
    }

    100% {
        filter: hue-rotate(360deg);
    }
}
</style>
