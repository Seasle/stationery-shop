<template>
    <div class="container">
        <ImageViewer :images="data.images" />
        <div class="container__details">
            <template v-if="ready">
                <h3 class="container__title" :title="data.name">{{ data.name }}</h3>
                <p class="container__price">
                    <Price :value="data.price" />
                </p>
                <button
                    class="container__button"
                    @click="addToCart"
                    :disabled="inCart"
                    aria-label="Добавить в корзину"
                >
                    <IconBase class="container__button-icon">
                        <BoxIcon />
                    </IconBase>
                </button>
            </template>
            <template v-if="!ready">
                <div class="container__loading"></div>
            </template>
        </div>
    </div>
</template>

<script>
import { ref, watchEffect } from 'vue';
import { mapActions } from 'vuex';
import ImageViewer from '@/components/ImageViewer.vue';
import Price from '@/components/Price.vue';
import IconBase from '@/components/IconBase.vue';
import BoxIcon from '@/components/icons/BoxIcon.vue';
import { get, post } from '@/api';

export default {
    name: 'ProductInfo',
    props: {
        id: {
            type: [String, Number],
            required: true,
        }
    },
    components: {
        ImageViewer,
        Price,
        IconBase,
        BoxIcon,
    },
    setup() {
        const ready = ref(false);
        const data = ref({});

        return {
            ready,
            data,
        };
    },
    computed: {
        inCart() {
            return this.$store.getters.cart.includes(this.data.id);
        },
    },
    methods: {
        ...mapActions(['updateCart']),
        addToCart() {
            const [response] = post('cart', { id: this.data.id });

            response.then(cart => this.updateCart(cart));
        }
    },
    mounted() {
        watchEffect(onInvalidate => {
            const [response, controller] = get(`product/${this.$route.params.id}`);

            response.then(response => {
                if (response?.statusCode === 404) {
                    this.ready = false
                    this.data = {};
                } else {
                    this.ready = true;
                    this.data = response;
                }
            });

            onInvalidate(() => {
                controller.abort();
            });
        }, { flush: 'post' });
    },
};
</script>

<style lang="scss" scoped>
.container {
    padding: 24px 96px;
    gap: 24px;
    display: grid;
    grid-template-columns: 360px 1fr;
    justify-content: center;
    align-items: center;

    &__details {
        position: relative;
        min-height: 240px;
        padding: 24px;
        gap: 24px;
        box-sizing: border-box;
        border-radius: 4px;
        display: grid;
        grid-template-columns: 1fr max-content;
        grid-template-rows: repeat(2, max-content);
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2),
                    0 2px 4px 0 rgba(0, 0, 0, 0.15),
                    0 4px 8px 0 rgba(0, 0, 0, 0.1),
                    0 8px 16px 0 rgba(0, 0, 0, 0.05);
    }

    &__title {
        grid-area: 1 / 1 / 2 / 2;
        font-size: 4rem;
        line-height: 1;
    }

    &__price {
        grid-area: 2 / 1 / 3 / 2;
        font-size: 8rem;
        line-height: 1;
    }

    &__button {
        padding: 24px;
        border: none;
        border-radius: 4px;
        grid-area: 1 / 2 / 3 / 3;
        align-self: center;
        background: #f5f5f5;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1),
                    0 4px 4px 0 rgba(0, 0, 0, 0.1),
                    0 8px 8px 0 rgba(0, 0, 0, 0.1),
                    0 16px 16px 0 rgba(0, 0, 0, 0.1),
                    0 32px 32px 0 rgba(0, 0, 0, 0.1);
        transition: background-color 0.1s ease-in-out;

        &:not([disabled]):hover {
            background: var(--primary-color);
        }

        &-icon {
            width: 48px;
            height: 48px;
        }
    }

    &__loading {
        --size: 120px;

        position: absolute;
        top: calc(50% - calc(var(--size) / 2));
        left: calc(50% - calc(var(--size) / 2));
        width: var(--size);
        height: var(--size);
        border: 8px solid transparent;
        border-top-color: var(--primary-color);
        border-radius: 50%;
        animation: spin 1s infinite ease-in-out;
    }
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
