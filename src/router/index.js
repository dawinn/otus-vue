import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/viewports/main.vue';
import FailPage from '@/viewports/404.vue';
import LoginPage from '@/viewports/login-page.vue';
import AddItemForm from '@/viewports/add-item.vue';

import OrderForm from '@/viewports/order-page.vue';
import ProductItem from '@/viewports/item-info.vue';
import CartPage from '@/components/cart/cart-form.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: MainPage,
    },
    {
        path: '/login',
        name: 'Auth',
        component: LoginPage,
    },
    {
        path: '/cart',
        name: 'Cart',
        component: CartPage
    },
    {
        path: '/order',
        name: 'Order',
        component: OrderForm,
        meta: { requiresAuth: false }
    },
    {
        path: '/catalogue/:id',
        name: 'ItemInfo',
        component: ProductItem,
        props: (route) => ({ id: Number(route.params.id) }),
    },
    {
        path: '/catalogue/add',
        name: 'AddItem',
        component: AddItemForm,
        meta: {requiresAuth: true}
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: FailPage
    }
]

const isAuthenticated = () => {
    return !!localStorage.username;
};

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isAuthenticated()) {
            next({
                path: '/login',
                query: { redirect: to.path },

            })
        } else {
            next();
        }
    } else {
        next();
    }
});


export default router;
