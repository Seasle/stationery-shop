<template>
    <div class="counter">
        <button class="counter__button" @click="decrease" :disabled="!canDecrease">
            <IconBase viewBox="0 0 492 492">
                <MinusIcon />
            </IconBase>
        </button>
        <input type="text" class="counter__input" :value="value" readonly />
        <button class="counter__button" @click="increase" :disabled="!canIncrease">
            <IconBase viewBox="0 0 492 492">
                <PlusIcon />
            </IconBase>
        </button>
    </div>
</template>

<script>
import IconBase from '@/components/IconBase.vue';
import { PlusIcon, MinusIcon } from '@/components/icons';
import { clamp } from '@/utils';

export default {
    name: 'Counter',
    props: {
        value: {
            type: Number,
            default: () => 0,
        },
        min: {
            type: Number,
            default: () => -Infinity,
        },
        max: {
            type: Number,
            default: () => Infinity,
        },
        step: {
            type: Number,
            default: () => 1
        },
    },
    components: {
        IconBase,
        PlusIcon,
        MinusIcon,
    },
    computed: {
        canDecrease() {
            return this.value > this.min;
        },
        canIncrease() {
            return this.value < this.max;
        }
    },
    methods: {
        decrease() {
            this.$emit('change-count', clamp(this.min, this.max, this.value - this.step));
        },
        increase() {
            this.$emit('change-count', clamp(this.min, this.max, this.value + this.step));
        },
    }
};
</script>

<style lang="scss" scoped>
.counter {
    border: 1px solid #444444;
    gap: 1px;
    border-radius: 4px;
    display: grid;
    grid-template-columns: 32px 1fr 32px;
    grid-template-rows: minmax(32px, 1fr);
    background: #444444;
    overflow: hidden;

    &__button {
        padding: 4px;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--primary-color);

        &[disabled] {
            opacity: 0.8;
        }
    }

    &__input {
        width: 60px;
        padding: 4px 8px;
        box-sizing: border-box;
        border: none;
        font: inherit;
    }
}
</style>
