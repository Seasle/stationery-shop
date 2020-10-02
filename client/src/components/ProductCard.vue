<template>
    <div class="card">
        <h3 class="card__title">{{ data.name }}</h3>
        <img class="card__image" :src="image" alt="" v-if="image !== null" />
        <div class="card__image" v-if="image === null"></div>
        <p class="card__price">
            <Price :value="data.price" />
        </p>
        <p class="card__sales" v-if="sales !== undefined">Продано: {{ sales }}</p>
        <button class="card__button">
            <IconBase class="card__button-icon">
                <BoxIcon />
            </IconBase>
            Добавить в корзину
        </button>
    </div>
</template>

<script>
import Price from '@/components/Price.vue';
import IconBase from '@/components/IconBase.vue';
import BoxIcon from '@/components/icons/BoxIcon.vue';

export default {
    name: 'ProductCard',
    props: {
        data: {
            type: Object,
            default: () => ({
                name: 'Нет названия товара',
                price: 0,
                preview: null,
            }),
        },
        sales: Number,
    },
    components: {
        Price,
        IconBase,
        BoxIcon,
    },
    computed: {
        image() {
            if (this.data.preview !== null) {
                return `http://127.0.0.1:3000/image/${this.data.preview}`;
            } else {
                return null;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.card {
    padding: 16px;
    gap: 16px;
    border-radius: 4px;
    display: grid;
    grid-template-columns: max-content 1fr;
    grid-auto-rows: max-content;
    background: #ffffff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.15),
        0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 8px 16px 0 rgba(0, 0, 0, 0.05);

    &__title {
        font-size: 1.5rem;
        grid-column: 1 / 3;
    }

    &__image {
        width: 64px;
        height: 64px;
        border-radius: 4px;
        object-fit: contain;

        &:not([src]) {
            background: #cccccc;
        }
    }

    &__price {
        height: 64px;
        font-size: 40px;
        line-height: 64px;
    }

    &__sales {
        grid-column: 1 / 3;
        font-size: 1.25rem;
    }

    &__button {
        padding: 12px;
        margin-top: 16px;
        border: none;
        border-radius: 4px;
        grid-column: 1 / 3;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.875rem;
        font-family: inherit;
        background: #eeeeee;
        transition: background-color 0.1s ease-in-out;

        &:hover {
            background: var(--primary-color);
        }

        &:focus {
            outline: none;

            &.focus-visible {
                text-decoration: underline;
            }
        }

        &-icon {
            margin-right: 8px;
        }
    }
}
</style>
