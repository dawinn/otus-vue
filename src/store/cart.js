import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

const useCart = defineStore('cart', () => {
    const getLocalStoreData = () => {
        if (localStorage.cart) {
            return JSON.parse(localStorage.cart);
        } else {
            return null;
        }
    };

    const cart = ref(new Map(getLocalStoreData()));

    const pushToCart = (item) => {
        const itemInCart = cart.value.get(item.id);
        cart.value.set(item.id, {...item,
            count: (itemInCart?.count ?? 0) + 1
        });
        save();
        return cart.value;
    };

    const dropFromCart = (id) => {
        const result = cart.value.delete((id));
        save();

        return result;
    };

    const clearCart = () => {
        cart.value.clear();
        save();
    };

    const cartList = () => {
        let array = [];
        for (let item of cart.value) {
            const [id, obj] = item;
            array.push({id, ...obj})
        }

        return array;
    };

    const inCartCount = (id) => (cart.value.get(id)?.count || 0);



    const cartSize = computed(() => (cart.value.size));
    const isCartEmpty = computed(() => (!cartSize.value));

    const totalSum = computed(() => cartList().reduce((sum, elem) => (sum + elem.price * elem.count), 0))

    function save() {
        let array = [];
        for (let item of cart.value) {
            array.push(item)
        }
        localStorage.cart = JSON.stringify(array);
    }

    return {
        cart,
        pushToCart,
        dropFromCart,
        clearCart,
        cartList,
        inCartCount,
        cartSize,
        isCartEmpty,
        totalSum
    }

});

export default useCart;
