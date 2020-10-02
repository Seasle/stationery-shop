<template>
    <Header />
    <Wrapper>
        <router-view />
    </Wrapper>
    <Footer />
</template>

<script>
import Header from '@/components/common/Header';
import Wrapper from '@/components/common/Wrapper';
import Footer from '@/components/common/Footer';

export default {
    name: 'App',
    components: {
        Header,
        Wrapper,
        Footer,
    },
};
</script>

<style lang="scss">
#app {
    min-height: 100vh;
    font-family: 'Raleway', Arial, Helvetica, sans-serif;
    display: grid;
    grid-template-rows: max-content 1fr max-content;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
