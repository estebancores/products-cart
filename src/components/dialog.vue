<template>
  <TransitionRoot appear :show="modalOpenController" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex h-full items-center justify-center p-2 text-center">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel
              class="w-full sm:w-[900px] h-screen overflow-auto bg-white p-6 text-left align-middle shadow-xl transition-all">
              <slot />
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>

  </TransitionRoot>
</template>

<script setup>
import { ref } from 'vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'

const modalOpenController = ref(false)

function closeModal() {
  modalOpenController.value = false
}
function openModal() {
  modalOpenController.value = true
}

defineExpose({ openModal, closeModal });
</script>
