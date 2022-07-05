<script setup lang="ts">
import type { TaskIntf } from '@/interfaces'

defineProps<{
  task: TaskIntf;
}>()
</script>

<template>
  <div class="task">
    <h2 class="task__title">{{ task.title }}</h2>
    <span class="task__subtask-count">{{ task.subtasks.filter(task => task.isCompleted ).length}} of {{ task.subtasks.length }} subtasks</span>
  </div>
</template>

<style scoped lang="scss">
  .task {
    background-color: var(--color-foreground);
    border-radius: 0.5rem;
    padding-inline: 1rem;
    padding-block: 1.5rem;
    box-shadow: 0px 4px 6px rgba(54, 78, 126, 0.1);
    cursor: pointer;
    user-select: none;
    transition: transform 0.3s ease-out;

    &:hover {
      transform: scale(1.05);
    }

    &__title {
      font-size: calc(15rem / 16);
    }

    &__subtask-count {
      font-size: 0.75rem;
      font-weight: 700;
    }
  }
</style>