<template>
    <div class="card">
        <h3 class="card__title">Товар</h3>
        <div class="card__image"></div>
        <p class="card__price">
            <Price :value="price" />
        </p>
        <p class="card__sales" v-if="sales !== undefined">Продано: {{ sales }}</p>
        <button class="card__button">Добавить в корзину</button>
    </div>
</template>

<script>
import Price from '@/components/Price.vue'

export default {
    name: 'ProductCard',
    props: {
        sales: Number,
    },
    components: {
        Price,
    },
    data() {
        return {
            price: 1e4 + Math.floor(Math.random() * 8e4)
        }
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
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2),
                0 2px 4px 0 rgba(0, 0, 0, 0.15),
                0 4px 8px 0 rgba(0, 0, 0, 0.1),
                0 8px 16px 0 rgba(0, 0, 0, 0.05);

    &__title {
        font-size: 1.5rem;
        grid-column: 1 / 3;
    }

    &__image {
        width: 64px;
        height: 64px;
        border-radius: 4px;
        background: #cccccc;
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
        font-size: 0.875rem;
        font-family: inherit;
        background: #eeeeee;
        transition: background-color 0.1s ease-in-out;

        &:hover {
            background: var(--primary-color);
        }

        &:focus {
            text-decoration: underline;
            outline: none;
        }
    }
}
</style>
