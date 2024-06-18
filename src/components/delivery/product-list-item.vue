<template>
  <div class="w-full p-4 flex flex-row items-center gap-x-4 cursor-pointer border-b-[1px] last:border-b-0" @click="handleSelected(product)">
    <div class="image">
      <img v-if="category === 'fresas-crema'" src="../../assets/images/fresas-vaso.png" class="w-72 sm:w-40 rounded-xl" alt="fresas-con-crema">
      <img v-else src="../../assets/images/obleas.png" class="w-48 sm:w-32 rounded-xl" alt="obleas">
    </div>
    <div class="info">
      <div class="name font-bold text-xl text-black">{{ product.name }}</div>
      <div class="desc text-md text-[#7b7b7b]">
        {{ product.description }}
      </div>
      <div class="price font-bold text-l text-black">
        {{ product.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }) }}
      </div>
    </div>
  </div>
</template>
<script setup>

const props = defineProps(["product", "category"])
const emit = defineEmits(["productSelected"])

function handleSelected(product) {
  emit("productSelected", product)
}
</script>