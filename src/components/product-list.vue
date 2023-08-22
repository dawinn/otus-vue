<script setup>
import ProductItem from "./product-item.vue";

defineProps(['productList']);
</script>
<template>
  <h3>Заголовок списока</h3>
  <ul>
    <ProductItem v-for="product of productList"
                 v-bind:product="product"
    >
      {{product}}
    </ProductItem>
  </ul>
</template>

<style scoped>
</style>
