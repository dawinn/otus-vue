<script setup>
  import { ref } from 'vue';
  import ProductItem from './product-item.vue';
  import SearchForm from './search-form.vue';
  import useProducts from '@/store/products';
  import { storeToRefs } from 'pinia';
  const { loading } = storeToRefs(useProducts());
  const { productList, getFilter } = useProducts();
  const filters = ref({});
  const displayProducts = ref(productList());

  const filterApply = () => {
    displayProducts.value = getFilter(filters.value);
  }
</script>

<template>
  <SearchForm v-model="filters"
              @change="filterApply"
              >
  </SearchForm>

  <div v-if="loading" class="loading">
    Загрузка...
  </div>

  <div v-else>
    <v-row class="list__cafes-content">
      <v-col md="4" v-for="product of displayProducts">
        <ProductItem
                     :key="product.id"
                     :product="product">
        </ProductItem>
      </v-col>
    </v-row>
  </div>

</template>
