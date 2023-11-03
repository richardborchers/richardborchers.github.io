import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import '@mdi/font/css/materialdesignicons.css'

import vuetify from '../plugins/vuetify'
import router from '../plugins/router'

createApp(App).use(router).use(vuetify).mount('#app')
