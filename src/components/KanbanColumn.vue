<script setup lang="ts">
import type { BoardColumnIntf } from '@/interfaces';
import TaskCard from './TaskCard.vue';

defineProps<{
  column: BoardColumnIntf;
}>();

const randomColor = `hsl(${Math.floor(Math.random() * 360)}deg, 50%, 50%)`;
</script>

<template>
  <div class="column">
    <header class="column__header">
      <div class="column__color" />
      <span class="column__title"
        >{{ column.name }} ({{ column.tasks.length }})</span
      >
    </header>
    <div class="column__tasks">
      <TaskCard v-for="task of column.tasks" :key="task.title" :task="task" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.column {
  flex-basis: 17.5rem;
  flex-shrink: 0;

  &__header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }

  &__color {
    width: 15px;
    aspect-ratio: 1;
    border-radius: 50%;
    background-color: v-bind(randomColor);
  }

  &__title {
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 2.4px;
    font-weight: 700;
  }

  &__tasks {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
}
</style>
