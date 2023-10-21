import { mount } from '@vue/test-utils';
import { describe, it, vi, expect, afterEach } from 'vitest';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
    components,
    directives,
})

import ProductList from "@/components/product-list.vue";
import { createTestingPinia } from '@pinia/testing';

import products from '@/mock/products.json';

let wrapper;

describe('ProductList', () => {
    afterEach(() => {
        wrapper?.unmount()
    })

    it('product list loaded', async () => {
        wrapper = mount(ProductList, {
            global: {
                plugins: [ createTestingPinia({
                    initialState: {
                        products: {
                            loading: false,
                            products,
                        }
                    },
                    createSpy: vi.fn,

                }),
                    vuetify
                ]
            }
        });

        expect(wrapper.findAll('[data-testid="v-card"]').length).toEqual(products.length);
    })

    it('product list loading', () => {
        wrapper = mount(ProductList, {
            global: {
                plugins: [ createTestingPinia({
                    initialState: {
                        products: {
                            loading: true,
                        }
                    },
                    createSpy: vi.fn
                }) ]
            }
        })
        expect(wrapper.text()).toContain('Загрузка...');
    })
})
