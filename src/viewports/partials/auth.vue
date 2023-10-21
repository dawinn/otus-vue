<script setup>
import router from "@/router";

import useUser from '@/store/user';
import { storeToRefs } from 'pinia';
const { username } = storeToRefs(useUser());
const { logout: logoutAction } = useUser();

const logout = () => {
  logoutAction();
  router.push({name: 'Home'});
}
</script>

<template>
  <div data-testid="user-profile" v-if="username">
    Пользователь: {{ username }} |
    <v-btn @click="logout">выйти</v-btn>
  </div>
  <div data-testid="user-profile" v-else>
    <router-link :to="{name: 'Auth'}">Войти</router-link>
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
