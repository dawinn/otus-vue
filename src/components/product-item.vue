<script setup>
import {ref} from "vue";

const props = defineProps({
    product: {
      type: Object,
      required: true
    },
    cart: {
      type: Object
    }
  });

const apiCart = ref(props.cart);

const itemInCart = ref(apiCart.value.getOne(props.product.id)?.count);

const pushCart = () => {
  apiCart.value.push(props.product);
  itemInCart.value = apiCart.value.getOne(props.product.id)?.count;
};

</script>

<template>
    <v-card>
      <v-img :src="product.image" height="240"/>
      <v-card-title>
        <router-link :to="{name: 'ItemInfo', params: {id: product.id}}">{{  product.title }}</router-link>
      </v-card-title>
      <v-card-text>
        <p>{{ product.description }}</p>
        <p>Цена: <bold>{{ product.price }}</bold></p>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="pushCart">Добавить в корзину</v-btn>
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
