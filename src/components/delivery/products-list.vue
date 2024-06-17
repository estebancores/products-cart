<template>
  <div class="py-4">
    <!-- Product detail dialog -->
    <Dialog ref="productDetailsDialog">
      <div>
        <div class="p-4 rounded-md">
          <img class="h-auto w-3/4 mx-auto" src="../../assets/images/fresas-vaso.png" alt="fresas-con-crema">
        </div>
        <div>
          <h1 class="text-2xl font-bold mt-5 mb-2"> {{ selectedProduct.name }} </h1>
          <p class="text-xl text-gray-500">{{ selectedProduct.description }}</p>
        </div>
        <div class="w-full h-[1px] bg-gray-400 my-4"></div>
        <div>
          <div v-for="topin in toppings" :key="topin.name" class="mt-4 last:mb-10">

            <h1 class="text-xl font-bold">
              {{ topin.name }}
              &nbsp;
              {{ getPriceFormat(topin.price) }}
            </h1>

            <template v-if="topin.type === 'multiple'">
              <div v-for="option in topin.options" :key="option">
                <div class="flex flex-row justify-between">
                  <h2 class="text-xl"> {{ option }} </h2>
                  <input class="w-[25px] h-10" type="checkbox" v-model="toppingsSelected[topin.name]" :id="option"
                    :value="option">
                </div>
              </div>
            </template>

            <template v-else-if="topin.type === 'close_question'">
              <div v-for="option in topin.options" :key="option">
                <div class="flex flex-row justify-between">
                  <h2 class="text-xl"> {{ option }} </h2>
                  <input class="w-[25px] h-10" type="radio" v-model="toppingsSelected[topin.name]" :id="option"
                    :value="option">
                </div>
              </div>
            </template>

            <template v-else-if="topin.type === 'qty'">
              <div v-for="(option, optIdx) in topin.options" :key="option" class="mt-2">
                <div class="flex flex-row justify-between">
                  <h2 class="text-xl"> {{ option }} </h2>

                  <div class="flex flex-row items-center gap-2 my-1 text-2xl rounded-full border px-4">
                    <template v-if="toppingsSelected[topin.name]['options'][optIdx].qty > 0">
                      <button @click="toppingsSelected[topin.name]['options'][optIdx].qty--" class="font-bold">-</button>
                      <span> {{ toppingsSelected[topin.name]['options'][optIdx].qty }} </span>
                    </template>

                    <button @click="handleMoreToppingQuantity(topin.name, optIdx)" class="font-bold">+</button>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div class="w-full h-[1px] bg-gray-400 my-4"></div>
        <div class="my-2 text-xl font-bold">
          <span>Total: {{ getMoneyFormat(totalPrice) }} </span>
        </div>
        <div>
          <button 
              class="w-full bg-green-700 rounded-md py-4 px-10 text-center text-xl text-white shadow shadow-black"
              @click="handleAddToCart"
            >
            Agregar al pedido
          </button>
        </div>

        <div>
          <button class="w-full py-4 mt-2" @click="productDetailsDialog.closeModal()"> 
            Cancelar
          </button>
        </div>
      </div>
    </Dialog>
    <!-- Products List -->
    <div v-if="products.length">
      <ProductListItem 
        v-for="product in products"
        :key="product.name"
        :product="product"
        @productSelected="handleProductSelected"
      />
    </div>
    <div v-else>
      <h1 class="text-center text-2xl">No tenemos productos que ofrecerte</h1>
    </div>
  </div>
</template>

<script setup>

import { ref, reactive, watch, onMounted } from "vue"
import ProductListItem from './product-list-item.vue';
import Dialog from "../dialog.vue"

import { toppings } from "../../lib/data";

import { useMainStore } from "../../stores/main";

const props = defineProps(["products"])

const mainStore = useMainStore()
const productDetailsDialog = ref();
const selectedProduct = reactive({})
let toppingsSelected = reactive({})
let totalPrice = reactive(0)

function calculateTotal() {
  totalPrice = selectedProduct.price || 0
  for (let topping in toppingsSelected) {
    if (toppingsSelected[topping].calculate) {
      const reduced = toppingsSelected[topping]['options']
        .map(({ qty }) => qty)
        .reduce((a, b) => a + b, 0)
      totalPrice = totalPrice + (reduced * toppingsSelected[topping]['price'])
    }
  }
}

function getMoneyFormat(price) {
  const options = {
    style: 'currency', currency: 'COP',
    maximumFractionDigits: 0
  }
  return price.toLocaleString('es-CO', options)
}

function getPriceFormat(price) {
  return price > 0 ? `+ ${getMoneyFormat(price)} c/u` : ''
}

function resetToppings() {
  for (let topping of toppings) {
    if (topping.type === "multiple") {
      toppingsSelected[topping.name] = []
    } else if (topping.type === "close_question") {
      toppingsSelected[topping.name] = false
    } else if (topping.type === "qty") {
      toppingsSelected[topping.name] = {
        calculate: true,
        price: topping.price,
        options: topping.options.map((answer) => ({ name: answer, qty: 0 }))
      }
    }
  }
}

function handleMoreToppingQuantity(toppingName, optIdx) {
  if (toppingsSelected[toppingName]['options'][optIdx].qty < 3) {
    toppingsSelected[toppingName]['options'][optIdx].qty++
  }
}

function handleAddToCart() {
  const productTocart = {
    product: Object.assign({}, selectedProduct),
    totalPrice: totalPrice,
    addedToppings: {
      ...toppingsSelected
    }
  }
  mainStore.addProductToCart(productTocart)
  productDetailsDialog.value.closeModal()
  resetToppings()
  Object.assign(selectedProduct, {})
}

function handleProductSelected(product) {
  Object.assign(selectedProduct, product)
  productDetailsDialog.value.openModal()
  calculateTotal()
}

watch(toppingsSelected, () => {
  if (Object.keys(toppingsSelected).length !== 0) {
    calculateTotal()
  }
})

onMounted(() => {
  resetToppings()
})
</script>