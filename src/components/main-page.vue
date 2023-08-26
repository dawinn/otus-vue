<script setup>
import ProductList from "./product-list.vue";

</script>
<template>
  <main >
    <h2>Тут что-то от главной страницы</h2>
    <ProductList>
    </ProductList>
  </main>
</template>


<style scoped>
main {
  display: flex;
  flex-direction: column;
  padding: .5rem 2rem;
}
</style>
