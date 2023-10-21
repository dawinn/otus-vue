import { beforeEach, beforeAll, describe, it, expect } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';

import products from '@/mock/products.json';
import useCart from '@/store/cart';

describe('Cart store', () => {

    describe('push to cart', () => {
        let cart;
        beforeEach(() => {
            localStorage.removeItem('cart');
            setActivePinia(createPinia());
            cart = useCart();
        });

        it('Add 1', () => {
            const result = cart.pushToCart(products[0]);

            expect(result.size).toEqual(1);
        })

        it('Add all mock-array', () => {
            products.forEach((item) => cart.pushToCart(item));

            expect(cart.cartSize).toEqual(products.length);

        })

        it('multy push same goods', () => {
            cart.pushToCart(products[0]);
            cart.pushToCart(products[0]);
            cart.pushToCart(products[0]);
            cart.pushToCart(products[0]);

            expect(cart.inCartCount(1)).toEqual(4);
        })
    });

    describe('total summ cart', () => {
        let cart;

        beforeEach(() => {
            localStorage.removeItem('cart');
            setActivePinia(createPinia());

            cart = useCart();
            cart.pushToCart(products[0]);
            cart.pushToCart(products[0]);
            cart.pushToCart(products[0]);
            cart.pushToCart(products[1]);
            cart.pushToCart(products[1]);
            cart.pushToCart(products[1]);
            cart.pushToCart(products[1]);
            cart.pushToCart(products[2]);
            cart.pushToCart(products[2]);


        });

        it('109.95 * 3 + 22.3 * 4 + 55.99 * 2 = 531.03', () => {
            const totalSum = products[0].price * 3 + products[1].price * 4 + products[2].price * 2;

            expect(cart.totalSum).toEqual(totalSum);
        })
    });

    describe('drop & clear from cart', () => {
        let cart;

        beforeAll(() => {
            localStorage.removeItem('cart');
            setActivePinia(createPinia());
            cart = useCart();
            cart.pushToCart(products[0]);
            cart.pushToCart(products[0]);
            cart.pushToCart(products[0]);
            cart.pushToCart(products[1]);
            cart.pushToCart(products[1]);
            cart.pushToCart(products[1]);
            cart.pushToCart(products[1]);
            cart.pushToCart(products[2]);
            cart.pushToCart(products[2]);

        });

        it('check size & summ before drop', async () => {
            const totalSum = products[0].price * 3 + products[1].price * 4 + products[2].price * 2;

            expect(cart.totalSum).toEqual(totalSum);
        })

        it('check size & summ after drop 1 position success', () => {
            const result = cart.dropFromCart(1);
            const totalSum = products[1].price * 4 + products[2].price * 2;

            expect(result).toBeTruthy();
            expect(cart.cartSize).toEqual((products.length - 1) );
            expect(cart.totalSum).toEqual(totalSum);
        })

        it('check size & summ after drop 1 position fail', () => {
            const result = cart.dropFromCart(12);
            const totalSum = products[1].price * 4 + products[2].price * 2;

            expect(result).toBeFalsy();
            expect(cart.cartSize).toEqual((products.length - 1) );
            expect(cart.totalSum).toEqual(totalSum);
        })

        it('check size & summ after clear cart', () => {
            cart.clearCart();

            expect(cart.cartSize).toEqual(0);
            expect(cart.totalSum).toEqual(0);
        })
    });
});
