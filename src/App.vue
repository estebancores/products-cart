<template>
  <div id="router-container" class="h-full sm:max-w-[900px] mx-auto p-2 sm:p-10 ">
    <RealoadPWA />
    <router-view />
  </div>
</template>
<script setup>
  import RealoadPWA from "./ReloadPWA.vue"
</script>