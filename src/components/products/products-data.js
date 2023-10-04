import {defineComponent, reactive} from "vue";
import {fetchProducts} from "@/services/fetchers";

class ProductsData {

    constructor() {
        if (localStorage.goods) {
            this._data = JSON.parse(localStorage.goods);
        } else {
            this._data = [];
        }
    }

    async load() {
        this._data = await fetchProducts();
        localStorage.goods = JSON.stringify(this._data);
        return true;
    }

    create(item) {
        const newItem = Object.assign({id: this._data.length + 1, ...item});
        this._data.push(newItem);
        localStorage.goods = JSON.stringify(this._data);
        return newItem;
    }

    findAll() {
        return this._data;
    }

    findOne(id) {
        return this._data.find((item) => item.id === id);
    }

    getSize() {
        return this._data.length;
    }

    getFilter({title, priceMin, priceMax}) {
        let array = [...this._data];

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
}

const productList = defineComponent(() => {
    const products = reactive(new ProductsData());
    return products;
});

export default productList;
