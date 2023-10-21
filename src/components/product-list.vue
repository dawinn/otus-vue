<script setup>
import {computed, ref} from 'vue';
  import ProductItem from './product-item.vue';
  import SearchForm from './search-form.vue';
  import useProducts from '@/store/products';
  import { storeToRefs } from 'pinia';
  const { loading, productList } = storeToRefs(useProducts());
  const filters = ref({});
  const displayProducts = computed(() => {
    const {title, priceMin, priceMax} = filters.value;
    let array = productList.value;

    if (title && title.length > 3) {
      array = array.filter((item) => item.title.toUpperCase().includes(title.toUpperCase()));
    }
    return array
        .filter((item) => priceMin ? priceMin <= item.price : true)
        .filter((item) => priceMax ? item.price <= priceMax : true);
  });

</script>

<template>
  <SearchForm v-model="filters"
              >
  </SearchForm>
  <div v-if="loading" class="loading">
    Загрузка...
  </div>

  <div v-else>
    <v-row class="list__cafes-content" data-testid="display-products">
      <v-col md="4" v-for="product of displayProducts">
        <ProductItem
                     :key="product.id"
                     :product="product">
        </ProductItem>
      </v-col>
    </v-row>
  </div>

</template>
