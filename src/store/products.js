import { defineStore } from 'pinia';
import { onMounted, ref } from 'vue';
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
        const newItem = Object.assign({id: products.value.size + 1, ...item});
        products.value.set(newItem.id, newItem);
        save();
        return newItem;
    }

    const getProduct = (id) => (products.value.get(id));

    const productList = () => {
        let array = [];
        for (let item of products.value) {
            const [id, obj] = item;
            array.push({id, ...obj})
        }

        return array;
    };

    const getFilter = ({title, priceMin, priceMax}) => {
        let array = productList();

        if (title && title.length > 3) {
            array = array.filter((item) => item.title.toUpperCase().includes(title.toUpperCase()));
        }

        if (priceMin || priceMax) {
            if (priceMax && priceMin && priceMax < priceMin) {
                priceMax += priceMin;
                priceMin = priceMax - priceMin;
                priceMax -= priceMin;
            }

            if (priceMin) {
                array = array.filter((item) => priceMin <= item.price);
            }
            if (priceMax) {
                array = array.filter((item) => item.price <= priceMax);
            }
        }

        return array;
    }

    onMounted(async () => {
        await init();
    });

    return {
        products,
        productList,
        loading,
        addProduct,
        getProduct,
        getFilter
    }
});

export default useProducts;
