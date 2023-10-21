<script setup>
import { computed } from 'vue';
import useCart from '@/store/cart';

const { pushToCart, inCartCount } = useCart();

const props = defineProps({
    product: {
      type: Object,
      required: true
    },
    detail: Boolean
  });

const itemInCart = computed(() => inCartCount(props.product.id));
</script>

<template>
    <v-card data-testid="v-card">
      <v-img :src="product.image" height="240"/>
      <v-card-title>
        <router-link v-if="!detail" :to="{name: 'ItemInfo', params: {id: product.id}}">{{  product.title }}</router-link>
        <span v-else>{{  product.title }}</span>
      </v-card-title>
      <v-card-text>
        <p>{{ product.description }}</p>
        <p>Цена: <bold>{{ product.price }}</bold></p>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="pushToCart(product)">Добавить в корзину</v-btn>
        <div v-if="itemInCart">
          <p>Товаров в корзине: {{itemInCart}}</p>
        </div>
      </v-card-actions>
    </v-card>
</template>

<style scoped>
bold {
  font-weight: bolder;
}

</style>
