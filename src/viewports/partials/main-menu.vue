<script setup>
import { ref, mergeProps } from "vue";
const items = ref([
  { title: 'Главная', name: 'Home', uri: '/'},
  { title: 'Авторизация', uri: '/login'},
  { title: 'Каталог', uri: '/catalogue'},
  { title: 'Корзина товаров', uri: '/cart'},
  { title: 'Форма заказа', uri: '/order'},
  { title: 'Добавление товара к каталог', uri: '/catalogue/add' },
]);


</script>


<template>
  <v-menu>
    <template v-slot:activator="{ props: menu }">
      <v-tooltip location="bottom">
        <template v-slot:activator="{ props: tooltip }">
          <v-btn
              color="teal-lighten-2"
              v-bind="mergeProps(menu, tooltip)"
          >
            меню
          </v-btn>
        </template>
        <span>основное меню</span>
      </v-tooltip>
    </template>
    <v-list>
      <v-list-item v-for="(item, index) in items"
                   :key="index"
      >
        <v-list-item-title>
          <RouterLink :to="`${item.uri}`">{{item.title}}</RouterLink>

        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>




