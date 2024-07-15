<template>
  <div class="min-h-screen h-full flex flex-col ">
    <div class="">
      <h1 class="text-3xl sm:text-3xl font-bold text-center text-pretty mt-4">
        Elige el tamaño que deseas pedir <br> 🍓 🍦 🍓
      </h1>
    </div>

    <div class="grow items-list">
      <ProductsList :products="products" />
    </div>

    <div class="w-full h-20 text-center">
      <router-link to="/carrito"
        class="block w-[100%]  bg-green-700 rounded-md py-4 px-10 text-center text-xl text-white shadow shadow-black">
        🛒Carrito🛒 {{ getMoneyFormat(cartStatus.total) }}
      </router-link>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue"
import ProductsList from "../components/delivery/products-list.vue"

import { products } from "../lib/data"
import { useMainStore } from "../stores/main";

const mainStore = useMainStore()

const cartStatus = computed(() => {
  if (!mainStore.getCartProducts.length) return { qty: 0, total: 0 }
  return {
    qty: mainStore.getCartProducts.length,
    total: mainStore.getCartTotal
  }
})

function getMoneyFormat(price) {
  if (!price) return 0
  const options = {
    style: 'currency', currency: 'COP',
    maximumFractionDigits: 0
  }
  return price.toLocaleString('es-CO', options)
}

</script>
