<script setup lang="ts">
import { ref } from 'vue';
import Modal from './Modal.vue';

defineProps<{}>()

const showModal = ref(false);
</script>

<template>
  <Modal title="Add New Task" :isOpen="showModal" @close="showModal = false">
      <form class="add-task-form">
        <label for="title">Title</label>
        <input type="text" id="title">
        <label for="description">Description</label>
        <textarea id="description" />
      </form>
    </Modal>
</template>

<style scoped lang="scss">

</style>