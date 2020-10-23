<template>
    <div class="cart-item">
        <img class="cart-item__image" :src="image" alt="" v-if="image !== null">
        <div class="cart-item__image" v-if="image === null"></div>
        <h3 class="cart-item__title" :title="product.name">
            <router-link class="cart-item__link" :to="productURL">{{ product.name }}</router-link>
        </h3>
        <p class="cart-item__description">{{ product.description }}</p>
        <p class="cart-item__price">
            <Price :value="product.price * count" />
        </p>
        <div class="cart-item__controls">
            <Counter
                class="cart-item__counter"
                :value="count"
                :min="1"
                @change-count="changeCount"
            />
            <button class="cart-item__button" @click="remove">Удалить</button>
        </div>
    </div>
</template>

<script>
import { watchEffect } from 'vue';
import { mapActions } from 'vuex';
import Price from '@/components/Price.vue';
import Counter from '@/components/Counter.vue';
import { get, post, image } from '@/api';
import { debounce } from '@/utils';

const updateCart = debounce(cart => {
    post('cart/update', cart);
}, 300);

export default {
    name: 'CartItem',
    props: {
        id: {
            type: [String, Number],
            required: true,
        },
        count: {
            type: Number,
            required: true
        },
    },
    components: {
        Price,
        Counter,
    },
    computed: {
        image() {
            if (this.product?.images?.length > 0) {
                return image(this.product.images[0].path);
            } else {
                return null;
            }
        },
        productURL() {
            return `/product/${this.product.id}`;
        },
    },
    methods: {
        ...mapActions(['updateCart', 'updateCount']),
        remove() {
            const [response] = get(`cart/remove/${this.product.id}`);

            response.then(cart => this.updateCart(cart));
        },
        changeCount(count) {
            this.updateCount({
                id: this.product.id,
                count
            });

            updateCart(this.$store.state.cart);
        }
    },
    data() {
        return {
            product: {}
        };
    },
    mounted() {
        watchEffect(onInvalidate => {
            const [response, controller] = get(`product/${this.id}`);

            response.then(data => {
                if (data?.statusCode === 404) {
                    this.product = {};
                } else {
                    this.product = data;
                }
            });

            onInvalidate(() => {
                controller.abort();
            });
        }, { flush: 'post' });
    }
};
</script>

<style lang="scss" scoped>
.cart-item {
    padding: 8px;
    gap: 24px;
    border-radius: 4px;
    display: grid;
    grid-template-columns: max-content 1fr minmax(128px, max-content);
    grid-template-rows: max-content 1fr;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2),
                0 2px 4px 0 rgba(0, 0, 0, 0.15),
                0 4px 8px 0 rgba(0, 0, 0, 0.1),
                0 8px 16px 0 rgba(0, 0, 0, 0.05);

    &__image {
        width: 128px;
        height: 128px;
        border-radius: 4px;
        grid-area: 1 / 1 / 3 / 2;
        display: block;
        object-fit: contain;

        &:not([src]) {
            background: #cccccc;
        }
    }

    &__title {
        grid-area: 1 / 2 / 2 / 3;
        font-size: 36px;
        white-space: nowrap;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    &__link {
        color: inherit;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }

    &__description {
        grid-area: 2 / 2 / 3 / 3;
    }

    &__price {
        margin: 0;
        font-size: 36px;
    }

    &__controls {
        gap: 8px;
        display: grid;
        grid-auto-rows: max-content;
    }

    &__counter {
        align-self: start;
    }

    &__button {
        padding: 12px 16px;
        border: none;
        border-radius: 4px;
        font: inherit;
        background: #ffffff;
        color: #111111;
        box-shadow: inset 0 1px 2px 0 rgba(0, 0, 0, 0.15),
                    inset 0 2px 4px 0 rgba(0, 0, 0, 0.1),
                    inset 0 4px 8px 0 rgba(0, 0, 0, 0.05);
        transition: background-color 0.1s ease-in-out,
                    color 0.1s ease-in-out,
                    box-shadow 0.1s ease-in-out;

        &:focus {
            outline: none;

            &.focus-visible {
                text-decoration: underline;
            }
        }

        &:hover {
            background: var(--primary-color);
        }
    }
}
</style>
