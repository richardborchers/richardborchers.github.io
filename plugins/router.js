import { createRouter, createWebHashHistory } from 'vue-router'
import Start from '../src/components/Start.vue'
import Default from '../src/components/Default.vue'

export default createRouter({
    history: createWebHashHistory(),
    routes: [
      { path: '/', component: Default },
      { path: '/start', component: Start },
      { path: '/evaluate', component: Start },
    ]
})