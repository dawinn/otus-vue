<script setup>
import { ref, onMounted } from 'vue';

import Header from '@/components/main-header.vue';
import Footer from '@/components/main-footer.vue';
import MainMenu from '@/components/main-menu.vue';
import MainPage from '@/components/main-page.vue';
const productList = ref([]);

onMounted(() => {
  fetch(`https://fakestoreapi.com/products`)
    .then(response => response.json())
    .then(json => {
      productList.value = json;
    });
})


</script>


<template>
  <Header></Header>
  <MainMenu></MainMenu>
  <MainPage
      v-bind:productList="productList"
  > </MainPage>
  <Footer></Footer>

</template>


<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    justify-content: center;
    place-items: center;
  }



  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
