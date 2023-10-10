<script setup>
import useCart from '@/store/cart';
import { storeToRefs } from 'pinia';

const { isCartEmpty } = storeToRefs(useCart());
const { cartList, clearCart, dropFromCart } = useCart();
</script>

<template>
  <v-container  class="mb-3">
    <v-sheet width="800" class="mx-auto">
      <div v-if="isCartEmpty">
        <h3>Корзина пуста</h3>
        <router-link to="/">Веруться к покупкам?</router-link>
      </div>
      <div v-else>
        <v-form @submit="onSubmit">
          <h4>Список товаров в корзине:</h4>
          <v-list lines="two">
            <v-list-item v-for="cartItem of cartList()">
              <span><router-link :to="{name: 'ItemInfo', params: {id: cartItem.id}}">{{cartItem.title}}</router-link>
                            -  {{cartItem.price}} x {{cartItem.count}} = {{cartItem.price * cartItem.count}}</span>
              <v-btn density="compact" class="delete" @click="dropFromCart(cartItem.id)">&times;</v-btn>
            </v-list-item>
          </v-list>
        </v-form>
        <v-btn @click="clearCart()">Очистить корзину</v-btn>
        <v-btn @click="$router.push({name: 'Order'})">Оформить заказ</v-btn>
      </div>
    </v-sheet>
  </v-container>
</template>

<style scoped>
.delete {
  margin: 0 16px;
  color: darkred;
}
</style>
