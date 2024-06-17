import "./style.css"
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from './App.vue'


import Home from "./views/Home.vue"
import Delivery from "./views/Delivery.vue"
import Cart from "./views/Cart.vue"

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/pedidos',
      name: 'Delivery',
      component: Delivery
    },
    {
      path: '/carrito',
      name: 'Cart',
      component: Cart
    }
  ]
})

app.use(createPinia())
app.use(router)
app.mount('#app')