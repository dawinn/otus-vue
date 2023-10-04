import './assets/main.css'

import { createApp } from 'vue';
import router from './router/index.js';
import App from './App.vue'

import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})
createApp(App)
    .use(vuetify, {
        iconfont: 'mdi'
    })
    .use(router)
    .mount('#app')
