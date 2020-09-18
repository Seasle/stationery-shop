<template>
    <Container>
        <Catalog />
    </Container>
</template>

<script>
import Container from '@/components/common/Container.vue';
import Catalog from '@/components/Catalog.vue';

export default {
    name: 'Home',
    components: {
        Container,
        Catalog,
    },
};
</script>
