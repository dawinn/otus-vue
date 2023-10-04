<script setup>
import Cart from '@/components/cart/cart-vidget.vue';
defineProps({
  cart:  Object,
  username: String
});

</script>
<template>
  <v-app-bar app color="teal-lighten-3"
  >
    <v-app-bar-title>
      <h3>
        <router-link :to="{ name:'Home'}">
          НЕ СИМ-СИМ и НЕ EXPRESS
        </router-link>

      </h3>


    </v-app-bar-title>
    <Cart :cart="cart"></Cart>
  </v-app-bar>

</template>

