const fetchProducts = async () => {
    const data = await fetch(`https://fakestoreapi.com/products`)
        .then(response => response.json());
    console.log('data', data);
    return data;
}
export {
    fetchProducts,
}
