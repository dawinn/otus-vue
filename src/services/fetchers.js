import axios from "axios";
const fetchProducts = async () => {
    const data = axios.get(`https://fakestoreapi.com/products`)
        .then(response => response.data)
        .catch(() => {
            console.error('Произошла проблема при загрузке данных');
        });

    return data;
}
export {
    fetchProducts,
}
