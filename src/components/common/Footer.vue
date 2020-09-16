<template>
    <footer class="footer">
        <p class="footer__copyright">Магазин канцелярских товаров &copy; 2020, Мунько Александр <mark class="mark">ВТиПО 18-15</mark></p>
    </footer>
</template>

<script>
export default {
    name: 'Footer',
};
</script>

<style lang="scss" scoped>
.footer {
    padding: 24px;
    background: #111111;
    color: #ffffff;

    &__copyright {
        font-size: 0.875rem;
    }
}

.mark {
    padding: 4px;
    font-weight: 700;
    background: var(--primary-color);
}
</style>
