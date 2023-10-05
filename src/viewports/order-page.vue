<script setup>
import {onMounted, ref} from 'vue';
import useCart from '@/store/cart';
import { storeToRefs } from 'pinia';
import { defineRule, useForm, useField } from 'vee-validate';
import { dispatchOrder } from '/src/services/sender';

const { totalSum } = storeToRefs(useCart());
const { cartList } = useCart();

import useUser from '@/store/user';
const { username, userAddress } = storeToRefs(useUser());

defineRule('required', value => {
  if (!value || !value.length) {
    return 'Данное поле обязательно надо заполнить';
  }
  return true;
});
defineRule('email', value => {
  if (!value || !value.length) {
    return true;
  }
  // Check if email
  if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/.test(value.toUpperCase())) {
    return 'Проверьте правильность заполнения email';
  }
  return true;
});

const showSusscess = ref(false);
const validationSchema = {
  fio: (value) => ((value || value) ? true :  'Вы должны обязательно указать своё имя!'),
  consent: value => (value ? true : 'Надо согласиться, иначе никак...'),
  email: 'required|email',
};

const { handleSubmit } = useForm({validationSchema});
const fio = useField('fio', validationSchema.fio);
const email = useField('email', validationSchema.email);
const address = useField('address');
const consent = useField('consent', validationSchema.consent);

const onSubmit = handleSubmit((values) => {
  values.list = cartList();
  showSusscess.value = dispatchOrder(values);
});

onMounted(() => {
  if (userAddress.value) {
    fio.setValue(username.value);
  }
  if (userAddress.value) {
    address.setValue(userAddress.value);
  }
});
</script>

<template>
  <v-container  class="mb-3">
    <v-sheet width="600" class="mx-auto">
      <div v-if="showSusscess">
        <h3>Заказ успешно оформлен</h3>
        <router-link to="/">На главную?</router-link>
      </div>
      <div v-else>
        <h3>Оформить заказ на сумму {{ totalSum }}</h3>
        <v-form @submit="onSubmit">
          <div class="input-row">
            <v-text-field type="text"
                          variant="outlined"
                          v-model="fio.value.value"
                          label="ФИО"
                          :error-messages="fio.errorMessage.value"
            ></v-text-field>
          </div>
          <div class="input-row">
            <v-text-field type="text"
                          variant="outlined"
                          v-model="email.value.value"
                          label="e-mail"
                          :error-messages="email.errorMessage.value"
            ></v-text-field>
          </div>
          <div class="input-row">
            <v-textarea label="Адрес доставки"
                        variant="outlined"
                        v-model="address.value.value"
                        :error-messages="address.errorMessage.value"
            ></v-textarea>
          </div>
          <div class="input-row">
            <v-checkbox v-model="consent.value.value"
                        label="согласие с правилами обработки заказа"
                        :error-messages="consent.errorMessage.value"
            ></v-checkbox>
          </div>
          <v-btn @click="$router.push({name: 'Cart'})">Пересмотреть корзину</v-btn>
          <v-btn type="submit" >Отправить заказ</v-btn>
        </v-form>
      </div>
    </v-sheet>
  </v-container>
</template>

<style scoped>
.input-row {
  padding-top: 4px;
}
</style>
