<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="width"
        :height="height"
        :viewBox="viewBox"
        role="presentation"
    >
        <g :fill="color">
            <slot />
        </g>
    </svg>
</template>

<script>
export default {
    name: 'IconBase',
    props: {
        viewBox: {
            type: String,
            default: '0 0 512 512',
        },
        width: {
            type: [Number, String],
            default: 16,
        },
        height: {
            type: [Number, String],
            default: 16,
        },
        color: {
            type: String,
            default: 'currentColor',
        },
    },
};
</script>
