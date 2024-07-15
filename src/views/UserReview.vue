<template>
  <div>
    <div class="mt-20">
      <h1 class="text-4xl text-balance text-center"> Muchas gracias por haber realizado un pedido</h1>
      <h3 class="mt-5 text-2xl text-center">
        Para nosotros es muy importante la opinion de nuestros clientes
      </h3>
    </div>

    <div>
      <div class="w-fit p-4 mx-auto my-5">
        <template v-for="star in 5" :key="star">
          <button class="text-6xl mx-2" :class="[selectedStars.includes(star) ? 'text-yellow-500' : '']"
            @click="handleStarSelected(star)">
            {{ selectedStars.includes(star) ? "★" : "☆" }}
          </button>
        </template>
      </div>
    </div>

    <div v-if="selectedStars.length != 0 && badPerception">
      <template> </template>
      <textarea ref="textAreaRef" v-model="reviewText" rows="10" class="border border-gray-400 w-full rounded-lg p-3 resize-none"></textarea>
    </div>

    <div>
      <button></button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { whatsappNumber } from "../lib/data";
let selectedStars = ref([]);
let reviewText = ref('')
let textAreaRef = ref(null)

const badPerception = computed(() => selectedStars.value.length < 4)

function handleStarSelected(star) {
  selectedStars.value = [];
  for (let i = 0; i < star; i++) {
    selectedStars.value.push(i + 1);
  }

  if (selectedStars.value.length < 4) {
    setTimeout(() => {
      textAreaRef.value.focus()
    }, 100);
  }
}
</script>