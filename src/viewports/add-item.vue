<script setup>
import {ref} from "vue";
import {  defineRule, useForm, useField } from 'vee-validate';
import Products from '@/components/products/products-data';

const apiProducts = ref(Products.setup());

defineRule('required', value => {
  if (!value || !value.length) {
    return 'Данное поле обязательно надо заполнить';
  }
  return true;
});

const showSusscess = ref(false);

const validationSchema = {
  title: (value) => (value ? true : 'Наименование обязательно должно быть заполнено'),
  price: (value) => ((Number.isInteger(+value) && (+value).toFixed(2) > 0.00) ? true : `Цена должна быть неотрицательным числом больше нуля`),
  description: (value) => (value ? true: `Описание обязательно должно быть заполнено`),
  category: (value) => (value ? true : 'Категория товара обязательно должна быть заполнена'),
};

const { handleSubmit, handleReset } = useForm({validationSchema});
const title = useField('title', validationSchema.title);
const price = useField('price', validationSchema.price);
const description = useField('description', validationSchema.description);
const category = useField('category', validationSchema.category);

const onSubmit = handleSubmit((values) => {
  if (apiProducts.value.create(values)) {
    showSusscess.value = true;
  }
});

const addMore = () => {
  handleReset();
  showSusscess.value = false;
}
</script>

<template>
  <v-container  class="mb-3">
    <v-sheet width="300" class="mx-auto">
      <div v-if="showSusscess">
        <h3>Товар добавлен в каталог</h3>
        <v-btn @click="addMore">Добавить еще один?</v-btn>
      </div>
      <div v-else>
        <h3>Добавить товар в каталог</h3>
        <v-form @submit="onSubmit">
          <div class="input-row">
            <v-text-field type="text"
                          variant="outlined"
                          v-model="title.value.value"
                          label="Наименование"
                          :error-messages="title.errorMessage.value"
            ></v-text-field>
          </div>
          <div class="input-row">
            <v-text-field type="number"
                          variant="outlined"
                          v-model="price.value.value"
                          label="Цена"
                          :error-messages="price.errorMessage.value"
            ></v-text-field>
          </div>
          <div class="input-row">
            <v-textarea label="Описание"
                        variant="outlined"
                        v-model="description.value.value"
                        :error-messages="description.errorMessage.value"
            ></v-textarea>
          </div>
          <div class="input-row">
            <v-text-field type="text"
                          variant="outlined"
                          v-model="category.value.value"
                          label="Категория"
                          :error-messages="category.errorMessage.value"
            ></v-text-field>
          </div>
          <v-btn type="submit">Добавить товар</v-btn>
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
