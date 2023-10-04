<script setup>
  import ProductItem from './product-item.vue';
  import SearchForm from './search-form.vue';

  import {onMounted, ref} from "vue";
  import Products from '@/components/products/products-data';

  const apiProducts = ref(Products.setup());
  const productList = ref(apiProducts.value.findAll());

  const filters = ref({});

  defineProps({
    cart: Object
  })

  const filterApply = () => {
    let {
      fTitle:title,
      fPriceMin: priceMin,
      fPriceMax: priceMax
    } = filters.value;
    productList.value = apiProducts.value.getFilter({title, priceMin, priceMax });
  }

  const loading = ref(true);
  onMounted(async () => {
    if (productList.value.length) {
      loading.value = false;
      return;
    }

    await apiProducts.value.load();
    if (apiProducts.value.getSize()) {
      loading.value = false;
      productList.value = apiProducts.value.findAll();
    }
  })
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
      <v-col md="4" v-for="product of productList">
        <ProductItem
                     :key="product.id"
                     :product="product"
                     :cart="cart">
        </ProductItem>
      </v-col>
    </v-row>
  </div>

</template>
