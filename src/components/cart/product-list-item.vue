<template>
  <div class="w-full bg-white rounded-lg p-4 gap-x-4 my-5 cursor-pointer">
    <div class="info">
      <div class="flex justify-center">
        <button 
          class="text-red-500 mb-4 rounded-md px-4 py-2"
          @click="handleDeleteProduct"
        >
        Eliminar del pedido
      </button>
      </div>
      <div class="name font-bold text-xl">{{ product.product.name }} 🍓</div>
      <div class="price flex justify-between font-bold text-xl mt-4 mb-2">
        <span class="text-red-400">Base</span>
        <span> {{ getMoneyFormat(product.product.price) }} </span>
      </div>
      <div>
        <!-- free toppings -->
        <div>
          <h1 class="text-xl font-bold text-red-400">Adiciones sin costo</h1>
          <div v-for="(topping, addition) in product.addedToppings" :key="topping">
            <template v-if="!topping.price">
              <div class="flex justify-between my-1">
                <span class="text"> {{ addition }}: </span>
                <span > <strong>{{ noCostToppingsText(topping) }}</strong> </span>
              </div>
            </template>
          </div>
        </div>

        <!-- Cost Toppings -->
        <div v-if="shouldShowOtherAdditions(product.addedToppings)" class="mt-4">
          <h1 class="text-xl font-bold text-red-400">Otras Adiciones</h1>
          <div v-for="topping in product.addedToppings" :key="topping">
            
              <div v-for="addition in topping.options" :key="addition.name" class="flex justify-between">
                <template v-if="addition.qty > 0">
                  <span>{{ `${addition.name} X${addition.qty}` }} </span>
                  <span>{{ getMoneyFormat((topping.price * addition.qty)) }}</span>
                </template>
              </div>
            
          </div>
        </div>

        <div class="h-[1px] bg-gray-300 my-2"></div>

        <div class="flex justify-between text-xl font-bold">
          <span> Total </span>
          <span class=""> {{ getMoneyFormat(productTotal()) }} </span>
        </div>

      </div>
    </div>
  </div>
</template>
<script setup>

const props = defineProps(["product"])
const emit = defineEmits(["deleteProduct"])

function getMoneyFormat(price) {
  if (!price) return 0
  const options = {
    style: 'currency', currency: 'COP',
    maximumFractionDigits: 0
  }
  return price.toLocaleString('es-CO', options)
}

function shouldShowOtherAdditions(additions) {

  let amount = 0
  for (let topping in additions) {
    if (additions[topping].price && additions[topping]?.price !== 0) {
      amount = additions[topping].options
        .map((top) => top.qty)
        .reduce((a, b) => a + b, 0)
    }
  }
  return !!amount
}

function productTotal() {
  let totalPrice = props.product.product.price || 0
  const addedToppings = props.product.addedToppings
  for (let topping in addedToppings) {
    if (addedToppings[topping].price && addedToppings[topping].price !== 0){
        const reduced = addedToppings[topping]['options']
          .map(({ qty }) => qty)
          .reduce((a, b) => a + b, 0)
        totalPrice = totalPrice + (reduced * addedToppings[topping].price)
    }
  }
  return totalPrice
}

function noCostToppingsText(topping) {
  let detail = ''
  if (typeof topping === "object"){
    if (topping.length === 0) {
      detail += " No"
    } else {
      detail += topping.join(", ")
    }
  } else if (typeof topping === "boolean" || typeof topping === "string") {
    if (topping) {
      detail += topping
    } else {
      detail += " No"
    }
  }
  return detail
}

function handleDeleteProduct() {
  emit("deleteProduct", props.product.id)
}

</script>