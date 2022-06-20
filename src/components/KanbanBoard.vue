<script setup lang="ts">
import PrimaryButton from '@/components/PrimaryButton.vue'

defineProps<{
  board: BoardIntf;
}>()
</script>

<template>
  <div class="board__no-column">
    <p>This Board is empty. Create a new column to get started</p>
    <PrimaryButton>+ Add New Column</PrimaryButton>
  </div>
</template>

<style scoped lang="scss">
  .board__no-column {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;

    p {
      font-size: 1.125rem;
      font-weight: 700;
      text-align: center;
    }
  }
</style>