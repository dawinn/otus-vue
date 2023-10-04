<script setup>
  import Header from '@/viewports/partials/main-header.vue';
  import Footer from '@/viewports/partials/main-footer.vue';
  import MainMenu from '@/viewports/partials/main-menu.vue';

  import cart from '@/components/cart/cart-data';
  import {reactive, ref} from "vue";
  const apiCart = cart.setup();
  const username = reactive(localStorage.username);
</script>


<template>
  <v-app>
    <Header :cart="apiCart"
            v-model:username="username"></Header>
    <v-main>
      <MainMenu></MainMenu>
      <RouterView :cart="apiCart"
                  v-model:username="username"/>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>


<style scoped>
header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    justify-content: center;
    place-items: center;
  }
  main {
    min-width: 1300px;
    padding-top: calc(var(--v-layout-top) + 1rem);
  }
}
</style>
