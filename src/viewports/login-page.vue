<script setup>
import { useForm, useField } from 'vee-validate';
import {ref} from 'vue';

import router from "@/router";
import useUser from '@/store/user';
const { login: loginAction } = useUser();

const validationSchema = {
  login: (value) => (value ? true : 'Введите имя!'),
  pass: (value) => ( value ?  true : 'Введите пароль...'),
}
const { handleSubmit } = useForm({
  validationSchema
});

const login = useField('login', validationSchema.login);
const pass = useField('pass', validationSchema.pass);
const errorMessage = ref('');


const onSubmit = handleSubmit((values) => {
  const {login, pass} = values;
  if (loginAction(login, pass)) {
    const { redirect } = router.currentRoute.value.query;
    if (redirect) {
      router.push({path: redirect});
    } else {
      router.push({name: 'Home'});
    }
  } else {
    errorMessage.value = 'Не верные логин или пароль. Попробуйте снова';
  }
});

</script>
<template>
  <v-container  class="mb-3">
    <v-sheet width="300" class="mx-auto">
      <v-form @submit="onSubmit">
        <h3>Пожалуйста, авторизуйтесь</h3>
        <div class="input-row">
          <v-text-field type="text"
                        variant="outlined"
                        v-model="login.value.value"
                        label="Логин"
                        :error-messages="login.errorMessage.value"
          ></v-text-field>
        </div>
        <div class="input-row">
          <v-text-field clearable
                        type="password"
                        variant="outlined"
                        label="Пароль"
                        v-model="pass.value.value"
                        :error-messages="pass.errorMessage.value"
          ></v-text-field>
        </div>
        <v-btn type="submit" block class="mt-2">Submit</v-btn>
      </v-form>
      <ErrorMessage class="error-message">{{errorMessage}}</ErrorMessage>
    </v-sheet>

  </v-container>
</template>

<style scoped>

.input-row span,
.error-message{
  font-size: small;
  color: darkred;
  padding-left: 8px;
}
</style>


