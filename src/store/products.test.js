import { beforeAll, describe, it, vi, expect } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';

import products from '@/mock/products.json';
import useProducts from '@/store/products';

vi.mock('@/services/fetchers', () => ({
    fetchProducts: vi.fn().mockResolvedValue(products)}));

const newItem = {
    "title": "Новый товар, в т.ч для тестирования поиска",
    "price": 55.03,
    "description": "Тут должно быть весьма некороткое описание товара. Его вес, цвет, габариты, дифирамбы удобства использования и прочее",
    "category": "категория товара",
}

const toMatchItem = products[0];

describe('Product store:', () => {
    let productsStore;

    beforeAll(() => {
        localStorage.removeItem('goods');
        setActivePinia(createPinia());
        productsStore = useProducts();
    })

    it('init', async () => {
        await productsStore.init();
        expect(productsStore.products.size).toEqual(products.length);
    })

    it('add new', () => {
        const sizeBeforeAdd = productsStore.products.size;
        const result = productsStore.addProduct(newItem);
        expect(result.id).toBe(productsStore.products.size);
        expect(productsStore.products.size).toBe(sizeBeforeAdd + 1);
    })

    it('get one by id', () => {
        const result = productsStore.getProduct(1);
        expect(result).toMatchObject(toMatchItem);
    })

    it('get one by id fail', () => {
        const result = productsStore.getProduct(productsStore.products.size + 2);
        expect(result).toBeUndefined();
    })

    // it('filter by part of name success 1', () => {
    //     const result = productsStore.getFilter({title: 'для тестирования'});
    //     expect(result.length).toMatchObject(1);
    //     expect(result[0]).toMatchObject(newItem);
    // })
    //
    // it('filter by part of name success 2', () => {
    //     const result = productsStore.getFilter({title: 'Backpack'});
    //     expect(result.length).toMatchObject(1);
    //     expect(result[0]).toMatchObject(toMatchItem);
    // })
    //
    // it('filter by part of name fail', () => {
    //     const result = productsStore.getFilter({title: 'тоже для тестирования'});
    //     expect(result).toStrictEqual([]);
    // })

});
