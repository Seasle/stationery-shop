import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/cart',
        name: 'Cart',
        component: () => import('../views/Cart.vue'),
    },
    {
        path: '/catalog/:id',
        name: 'Catalog',
        component: () => import('../views/Catalog.vue'),
    },
    {
        path: '/product/:id',
        name: 'Product',
        component: () => import('../views/Product.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
