<script setup lang="ts">
import { TransitionRoot, Dialog, DialogPanel } from '@headlessui/vue';
defineProps<{
  title: string;
  isOpen: boolean;
  clazz?: string;
}>();
const emit = defineEmits<{
  (e: 'close'): void;
}>();
function closeModal() {
  emit('close');
}
</script>

<template>
  <Dialog :open="isOpen" @close="closeModal" class="modal-dialog">
    <DialogPanel class="modal-content" :class="clazz">
      <h2>{{ title }}</h2>
      <slot />
    </DialogPanel>
  </Dialog>
</template>

<style>
.modal-dialog {
  position: fixed;
  inset: 0;
  z-index: 999;
  background-color: rgb(0 0 0 / 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: var(--color-foreground);
  color: var(--color-text-2);
  width: min(30rem, 100% - 1rem);
  padding: 2rem;
  border-radius: 6px;
  /* overflow-y: auto; */
}

h2 {
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
}
</style>
