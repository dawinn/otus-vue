<script setup>
import {ref} from "vue";
import { Form, Field, defineRule } from 'vee-validate';

defineRule('required', value => {
  if (!value || !value.length) {
    return 'Данное поле обязательно надо заполнить';
  }
  return true;
});

const showSusscess = ref(false);
const schema = {
  title: (value) => (value ? true : 'Наименование обязательно должно быть заполнено'),
  price: (value) => ((Number.isInteger(+value) && (+value).toFixed(2) > 0.00) ? true : `Цена должна быть неотрицательным числом больше нуля`),
  description: (value) => (value ? true: `Описание обязательно должно быть заполнено`),
  category: (value) => (value ? true : 'Категория товара обязательно должна быть заполнена'),
};

const props = defineProps({
  productList: {
    type: []
  }
});

const emit = defineEmits(['update:productList']);

const onSubmit = (values) => {
  const list = props.productList;
  values.id = list.length + 1;
  emit('update:productList', list.splice(list.length, 0, values));
}
</script>

<template>
  <div v-if="showSusscess">
    <h3>Товар добавлен в каталог</h3>
  </div>
  <div v-else>
    <h3>Добавить товар в каталог</h3>
    <Form :validation-schema="schema"  @submit="onSubmit" v-slot="{ errors }">
      <div class="input-row">
        <label>Наименование</label>
        <Field name="title" type="text"/>
        <span>{{ errors.title }}</span>
      </div>
      <div class="input-row">
        <label>Цена</label>
        <Field name="price"/>
        <span>{{ errors.price }}</span>
      </div>
      <div class="input-row">
        <label>Описание</label>
        <Field name="description" as="textarea"></Field>
        <span>{{ errors.description }}</span>
      </div>
      <div class="input-row">
        <label>Каталог</label>
        <Field name="category"/>
        <span>{{ errors.category }}</span>
      </div>
      <button type="submit" >Отправить заказ</button>
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
