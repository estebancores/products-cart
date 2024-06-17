<template>
  <div class="w-full bg-white rounded-lg p-4 flex flex-row items-center gap-x-4 my-5 cursor-pointer" @click="handleSelected(product)">
    <div class="image">
      <img src="../../assets/images/fresas-vaso.png" class="w-72 sm:w-40 rounded-xl" alt="fresas-con-crema">
    </div>
    <div class="info">
      <div class="name font-bold text-xl">{{ product.name }}</div>
      <div class="desc text-md">
        {{ product.description }}
      </div>
      <div class="price font-bold text-xl">
        {{ product.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }) }}
      </div>
    </div>
  </div>
</template>
<script setup>

const props = defineProps(["product"])
const emit = defineEmits(["productSelected"])

function handleSelected(product) {
  emit("productSelected", product)
}
</script>