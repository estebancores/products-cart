<template>
  <div class="min-h-screen">
    <div>
      <h1 class="text-2xl font-bold text-center"> 🛒 Carrito</h1>
      <h3 class="text-xl text-center text-gray-500"> Así va tu pedido</h3>
    </div>

    <div v-if="mainStore.getCartProducts.length">
      <ProductCartListItem @deleteProduct="handleDeleteProduct" v-for="product in mainStore.getCartProducts"
        :key="product.product.id" :product="product" />

      <div class="flex justify-between text-2xl bg-white p-4 rounded-md font-bold">
        <span>
          Total Pedido:
        </span>
        <span>{{ mainStore.getCartTotal }}</span>
      </div>

      <button class="text-xl text-center w-full p-4 bg-green-700 rounded-md shadow my-2 text-white"
        @click="handleFinish">
        Realizar pedido 😍
      </button>
    </div>

    <div v-else>
      <h2 class="text-3xl text-center my-20"> Debes escoger los productos que vas a pedir 😅</h2>
    </div>
    <div>
      <router-link to="/pedidos" class="block text-xl bg-white text-center w-full p-4 rounded-md my-2">
        👈 Seguir comprando
      </router-link>
    </div>

    <div>
      <button v-if="mainStore.getCartProducts.length > 0" to="/pedidos"
        class="block text-xl text-green-700 text-center w-full p-4 rounded-md my-4" @click="handleNewDelivery">
        Iniciar nuevo pedido
      </button>
      <router-link v-else to="/pedidos" class="block text-xl text-green-700 text-center w-full p-4 rounded-md my-4">Iniciar
        nuevo pedido</router-link>
    </div>

  </div>
</template>

<script setup>
import { useMainStore } from "../stores/main"
import { useRouter } from "vue-router"
import ProductCartListItem from "../components/cart/product-list-item.vue"
import { whatsappNumber } from "../lib/data"

const mainStore = useMainStore()
const router = useRouter()

function handleDeleteProduct(productId) {
  let text = "¿Seguro que desea eliminar?";
  if (confirm(text) == true) {
    mainStore.deleteProductFromCart(productId);
  }
}

function iconName(name) {
  return name.toLowerCase().includes("fresa")
      ? "🍓"
      : "🫓"
}

function handleFinish() {
  let message = ''

  const products = mainStore.getCartProducts
  for (let i = 0; i < products.length; i++) {
    let { product, addedToppings, totalPrice } = products[i]

    message += `*:::::: Producto ${i + 1} ::::::* %0a`
    message += `*${product.name} ${iconName(product.name)}*%0a`
    for (let toppinName in addedToppings) {
      message += `*${toppinName}*%0a`

      // Closed questions
      const type = typeof addedToppings[toppinName];
      if (type === "boolean" || (type === "string" && ["Si", "No"].includes(addedToppings[toppinName]))) {
        if (addedToppings[toppinName]) {
          message += `- ${addedToppings[toppinName]}`
        } else {
          message += `- No`
        }
        message += "%0a"
      }

      if (type === "object" && addedToppings[toppinName].price) {
        let options = addedToppings[toppinName].options
        for (let option of options) {
          if (option.qty > 0) {
            message += `- ${option.qty}X - ${option.name}%0a`
          }
        }

      } else if (type === "object") {
        if (addedToppings[toppinName].length) {
          for (let answer of addedToppings[toppinName]) {
            message += `- ${answer}%0a`
          }
        } else {
          message += `- No%0a`
        }
      }
    }
    message += "----------------------------%0a";
    message += `Total producto: ${getMoneyFormat(totalPrice)}`;
    message += "%0a"
    message += "%0a"
  }
  message += "----------------------------%0a"
  message += `Total compra: ${getMoneyFormat(mainStore.getCartTotal)}`
  window.open(`https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`)
}

function getMoneyFormat(price) {
  if (!price) return 0
  const options = {
    style: 'currency', currency: 'COP',
    maximumFractionDigits: 0
  }
  return price.toLocaleString('es-CO', options)
}

function handleNewDelivery() {
  if (confirm("¿Seguro que desea iniciar de nuevo?")) {
    mainStore.clearCart()
    router.push("/pedidos")
  }
}
</script>