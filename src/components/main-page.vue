<script setup>
import ProductList from "./product-list.vue";

</script>
<template>
  <main >
    <h2>Добро пожаловать на сайт самого главного ответа!</h2>
    <p>Те, кто в курсе поймут, а кто не поймёт - тот не в курсе. И всё таки, повторим: 42.</p>
    <p>А ниже можно посмотреть немного того, что мы можем предложить вам к покупке на нашем замечательном во всех смыслах сайте.</p>
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
