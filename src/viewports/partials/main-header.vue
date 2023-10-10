<script setup>
import Cart from '@/components/cart/cart-vidget.vue';
import Profile from '@/viewports/partials/auth.vue';
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
    <Cart></Cart>
    <Profile/>
  </v-app-bar>

</template>

