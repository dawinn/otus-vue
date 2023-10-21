import { defineStore } from 'pinia';
import {computed, onMounted, ref} from 'vue';
import { fetchProducts } from '@/services/fetchers';

const useProducts = defineStore('products', () => {
    const getLocalStoreData = () => {
        if (localStorage.goods) {
            return JSON.parse(localStorage.goods);
        } else {
            return null;
        }
    };
    const products = ref(new Map(getLocalStoreData()));
    const loading = ref(false);

    const init = async () => {
        if (products.value.size) return;

        loading.value = true;
        try {
            const items = await fetchProducts();
            items.forEach((item) => products.value.set(item.id, item));
        } catch (e) {
            console.error('Ошибка чтения данных о товарах, ', e);
        } finally {
            loading.value = false;
        }

        save();
    }

    const save = () => {
        const array = [];
        for (let item of products.value) {
            array.push(item)
        }
        localStorage.goods = JSON.stringify(array);
    };

    const addProduct = (item) => {
        const newItem = {id: products.value.size + 1, ...item};
        products.value.set(newItem.id, newItem);
        save();
        return newItem;
    }

    const getProduct = (id) => (products.value.get(id));

    const productList = computed(() => {
        let array = [];
        for (let item of products.value.values()) {
            array.push(item)
        }

        return array
    });

    onMounted(() => init());

    return {
        products,
        productList,
        loading,
        addProduct,
        getProduct,
        init
    }
});

export default useProducts;
