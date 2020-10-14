<template>
    <div class="viewer">
        <div class="viewer__container">
            <img class="viewer__image" :src="previewURLs[current]" alt="" v-if="previewURLs.length > 0">
        </div>
        <div class="viewer__previews">
            <button
                v-for="(previewURL, index) in previewURLs"
                class="viewer__button"
                :class="{ 'viewer__button--active': current === index }"
                @click="() => setCurrent(index)"
                :key="index"
            >
                <img class="viewer__preview" :src="previewURL" alt="">
            </button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { image } from '@/api';

export default {
    name: 'ImageViewer',
    props: {
        images: {
            type: Array,
            default: () => [],
        },
    },
    setup() {
        const current = ref(0);

        return {
            current,
        };
    },
    computed: {
        previewURLs() {
            return this.images.map(entry => image(entry.path));
        },
    },
    methods: {
        setCurrent(index) {
            this.current = index;
        },
    },
};
</script>

<style lang="scss" scoped>
.viewer {
    gap: 24px;
    display: grid;
    grid-template-rows: 360px 80px;

    &__container,
    &__previews {
        padding: 8px;
        border-radius: 4px;
        background: #eeeeee;
    }

    &__image {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: contain;
    }

    &__previews {
        gap: 8px;
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: max-content;
    }

    &__button {
        padding: 0;
        border: none;
        border-radius: 4px;
        background: transparent;
        overflow: hidden;

        &--active {
            box-shadow: 0 0 0 2px var(--primary-color);
        }
    }

    &__preview {
        width: 64px;
        height: 64px;
        display: block;
        object-fit: contain;
    }
}
</style>
