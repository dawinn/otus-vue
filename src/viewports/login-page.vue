<script setup>
import { useForm, useField } from 'vee-validate';
import router from "../router";

const validationSchema = {
  login: (value) => (value ? true : 'Введите имя!'),
  pass: (value) => ( value ?  true : 'Введите пароль...'),
}
const { handleSubmit } = useForm({
  validationSchema
});

const login = useField('login', validationSchema.login);
const pass = useField('pass', validationSchema.pass);


const onSubmit = handleSubmit((values) => {
  const {login, pass} = values;
  localStorage.username = login;
  localStorage.pass = pass;
  const { redirect } = router.currentRoute.value.query;
  if (redirect) {
    router.push({path: redirect});
  } else {
    router.push({name: 'Home'});
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

    </v-sheet>

  </v-container>
</template>

<style scoped>

.input-row span {
  font-size: small;
  color: darkred;
  padding-left: 8px;
}
</style>


