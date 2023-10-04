import { defineComponent, reactive} from "vue";

class CartData {

    constructor() {
        if (localStorage.cart) {
            this._data = new Map(JSON.parse(localStorage.cart));
        } else {
            this._data = new Map();
        }
    }

    push(item) {
        const itemInCart = this._data.get(item.id);
        this._data.set(item.id, {
            count: (itemInCart?.count ?? 0) + 1,
            title: item.title,
            price: item.price
        });
        this.save()
        return this._data;
    }

    drop(id) {
        const result = this._data.delete((id));
        this.save();

        return result;
    }

    clear() {
        this._data.clear();
        this.save();
    }

    save() {
        let array = [];
        for (let item of this._data) {
            array.push(item)
        }
        localStorage.cart = JSON.stringify(array);
    }

    findAll() {
        let array = [];
        for (let item of this._data) {
            const [id, obj] = item;
            array.push({id, ...obj})
        }

        return array;
    }

    getOne(id) {
        return this._data.get(id);
    }
    getSize() {
        return this._data.size;
    }

    hasInto(id) {
        return this._data.has(id);
    }
}


const cart = defineComponent(function () {
    const cartApi = reactive(new CartData());
    return cartApi;
});

export default cart;
