<script setup>
  import ProductItem from './product-item.vue';
  import SearchForm from './search-form.vue';
  import OrderForm from "./order-form.vue";
  import AddItemForm from "./add-item-form.vue";

  import { fetchProducts } from '/src/services/fetchers';
  import {
    onMounted,
    ref
  } from "vue";


  const productList = ref([]);
  const productData = ref([]);
  const cartList = ref(new Set());
  const cartProductList = ref(new Map());
  const filters = ref({});

  const switchForms = ref('fOrderForm');

  const filterApply = () => {
    let {fTitle, fPriceMin, fPriceMax } = filters.value;
    let array = productData.value;

    if (fTitle && fTitle.length > 3) {
      array = array.filter((item) => item.title.toUpperCase().includes(fTitle.toUpperCase()));
    }

    if (fPriceMin || fPriceMax) {
      if (fPriceMax && fPriceMin && fPriceMax < fPriceMin) {
        fPriceMax += fPriceMin;
        fPriceMin = fPriceMax - fPriceMin;
        fPriceMax -= fPriceMin;
      }

      if (fPriceMin) {
        array = array.filter((item) => fPriceMin <= item.price);
      }
      if (fPriceMax) {
        array = array.filter((item) => item.price <= fPriceMax);
      }
    }

    productList.value = array;
  }

  const cartRefresh = () => {
    cartProductList.value = productData.value.filter(item => cartList.value.has(item.id));
  }

  const addItem = (id) =>  {
    cartList.value.add(id);
    cartRefresh();
  }

  onMounted(async () => {
    productData.value = await fetchProducts();
    productList.value = productData.value
  });
</script>

<template>
  <SearchForm v-model="filters"
              @change="filterApply"
              >
  </SearchForm>


  <ul class="mdc-list">
    <ProductItem v-for="product of productList"
                 :product="product"
                 :cartList="cartList"

    >
      <div v-if="cartList.has(product.id)">
        <p>Товар в корзине</p>
      </div>
      <div v-else>
        <button @click="addItem(product.id)">Добавить в корзину</button>
      </div>
    </ProductItem>
  </ul>
  <div class="switchForms">
    <label>Оформить заказ
      <input type="radio" value="fOrderForm" v-model="switchForms"/>
    </label>
    <label>Добавить товар в каталог
      <input type="radio" value="fAddForm" v-model="switchForms"/>
    </label>
  </div>
  <div v-if="switchForms == 'fOrderForm'">
    <OrderForm :cartList="cartList"
               :cartProductList="cartProductList"
    >

    </OrderForm>

  </div>
  <div v-if="switchForms == 'fAddForm'">
    <AddItemForm :productList="productList"
    >

    </AddItemForm>
  </div>

</template>

<style scoped>
ul {
  padding: 0;
}
.mdc-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
