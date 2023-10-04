<script setup>
import { ref } from "vue";
import ProductItem from '@/components/product-item.vue';
import Products from '@/components/products/products-data';

const props = defineProps({
  cart:  Object,
  id: Number
});
const apiProducts = ref(Products.setup());
const product = ref(apiProducts.value.findOne(props.id));
</script>

<template>
<div class="fullInfo">
  <ProductItem :product="product"
               :cart="cart">
  </ProductItem>
</div>

</template>

<style scoped>
bold {
  font-weight: bolder;
}

.fullInfo {
  max-width: 600px;
  margin: 0 auto;
}

</style>
