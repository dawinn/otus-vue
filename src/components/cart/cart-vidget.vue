<script setup>
import {reactive} from "vue";

const props = defineProps({
  cart: {
    type: Object
  }
});

const cartSize = () => reactive(props.cart.getSize());
</script>

<template>
  <div v-if="cartSize()">
    <router-link :to="{ name: 'Cart' }"><span>Позиций в корзине: {{ cartSize() }}</span></router-link>
  </div>
  <div v-else>
    Корзина пуста
  </div>

</template>
<style scoped>
div {
  padding-right: 1rem;
 }
 a {
   color: #f8f8f8;
 }
 a:hover {
   background-color: transparent;
   opacity: 0.6;
 }
</style>
