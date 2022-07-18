<script setup lang="ts">
import type { TaskIntf } from '@/interfaces';
import { ref } from 'vue';
import Modal from './Modal.vue';
import StatusListbox from './StatusListbox.vue';

defineProps<{
  task: any;
}>();

const showDetails = ref(false);
</script>

<template>
  <div class="task" @click="showDetails = true">
    <h2 class="task__title">{{ task.title }}</h2>
    <span class="task__subtask-count"
      >{{ task.subtasks.filter((st: any) => st.is_completed).length }} of
      {{ task.subtasks.length }} subtasks</span
    >
    <Modal
      :title="task.title"
      :is-open="showDetails"
      @close="showDetails = false"
    >
      <p class="task__description">
        {{ task.description }}
      </p>
      <div class="task__subtasks-container">
        <h3>
          Subtasks ({{ task.subtasks.filter((st: any) => st.is_completed).length }} of
          {{ task.subtasks.length }})
        </h3>
        <div class="subtasks">
          <div
            class="subtask"
            v-for="(subtask, index) in task.subtasks"
            :key="subtask.title"
          >
            <input
              type="checkbox"
              :id="`subtask_${index + 1}`"
              v-model="subtask.is_completed"
            />
            <label :for="`subtask_${index + 1}`">{{ subtask.title }}</label>
          </div>
        </div>
        <div class="task__status">
          {{ task.status }}
          <label for="status">Current Status</label>
          <StatusListbox :current="task.status" @change-status="(newStatus) => task.status = newStatus" />
        </div>
      </div>
    </Modal>
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
