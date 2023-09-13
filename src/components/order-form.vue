<script setup>
import { ref } from "vue";
import { Form, Field, defineRule } from 'vee-validate';
import { dispatchOrder } from '/src/services/sender';

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
const schema = {
  fio: (value) => ((value || value) ? true :  'Вы должны обязательно указать своё имя!'),
  consent: value => (value && value.length ? true : 'Надо согласиться, иначе никак...'),
  email: 'required|email',
};
const props = defineProps({
  cartProductList: {
    type: Map
  },
  cartList: {
    type: Set
  }
});

const onSubmit = (values) => {
  values.list = props.cartList;
  showSusscess.value = dispatchOrder(values);
}

</script>

<template>
  <div v-if="showSusscess">
    <h3>Заказ успешно оформлен</h3>
  </div>
  <div v-else>
    <h3>Оформить заказ</h3>
    <Form :validation-schema="schema"  @submit="onSubmit" v-slot="{ errors }">
      <div class="input-row">
        <label>ФИО</label>
        <Field name="fio" type="text"/>
        <span>{{ errors.fio }}</span>
      </div>
      <div class="input-row">
        <label>e-mail</label>
        <Field name="email"/>
        <span>{{ errors.email }}</span>
      </div>
      <div class="input-row">
        <label>Адрес доставки</label>
        <textarea name="address"/>
      </div>
      <div class="input-row">
        <Field name="consent" type="checkbox" value="0"/>
        <label> согласие с правилами обработки заказа</label>
        <span>{{ errors.consent }}</span>
      </div>
      <button type="submit" >Отправить заказ</button>


      <h4>Список товаров:</h4>
      <ul>
        <li  v-for="cartItem of cartProductList">
          <span>{{cartItem.title}}  -  Цена: {{cartItem.price}}</span>
          <button>&times;</button>
        </li>
      </ul>
    </Form>
  </div>

</template>

<style scoped>
.input-row {
  padding-top: 4px;
}
.input-row *:nth-child(1) {
  display: inline-block;
  text-align: right;
  padding-right: 16px;
  width: 130px;
}
.input-row *:nth-child(2) {
  width: 300px;

}
.input-row *:nth-child(3) {
  font-size: small;
  color: darkred;
  padding-left: 8px;
}
</style>
