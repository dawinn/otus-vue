<script setup>
  import ProductItem from './product-item.vue';
  import SearchForm from './search-form.vue';

  import { fetchProducts } from '/src/services/fetchers';
  import {onMounted, ref} from "vue";
  const productList = ref([]);

  onMounted(async () => {
    productList.value = await fetchProducts();
  });
</script>

<template>
  <SearchForm>

  </SearchForm>
  <ul class="mdc-list">
    <ProductItem v-for="product of productList"
                 v-bind:product="product"
    >
    </ProductItem>
  </ul>
</template>

<style scoped>
.mdc-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
