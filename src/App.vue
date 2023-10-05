<script setup>
  import Header from '@/viewports/partials/main-header.vue';
  import Footer from '@/viewports/partials/main-footer.vue';
  import MainMenu from '@/viewports/partials/main-menu.vue';
</script>


<template>
  <v-app>
    <Header></Header>
    <v-main>
      <MainMenu></MainMenu>
      <RouterView/>
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
