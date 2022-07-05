<script setup lang="ts">
import PrimaryButton from '@/components/PrimaryButton.vue';
import KanbanColumn from '@/components/KanbanColumn.vue';
import type { BoardIntf } from '@/interfaces';
import { useKanban } from '@/stores/kanban';

defineProps<{
  board: BoardIntf;
}>();

const kanbanStore = useKanban();
</script>

<template>
  <div class="board__wrapper">
    <div v-if="board.columns.length === 0" class="board__no-column">
      <p>This Board is empty. Create a new column to get started</p>
      <PrimaryButton>+ Add New Column</PrimaryButton>
    </div>
    <div v-else class="board__columns">
      <KanbanColumn
        v-for="column of board.columns"
        :key="column.name"
        :column="column"
      />
    </div>
    <div v-if="kanbanStore.isMobileMenuOpen" class="backdrop" @click="kanbanStore.isMobileMenuOpen = false"/>
  </div>
</template>

<style scoped lang="scss">
.board__wrapper {
  position: relative;
  padding: 1.5rem 1rem 0;
  overflow: auto;
  height: 100%;
}
.backdrop {
  position: absolute;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
}

.board__no-column {
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

.board__columns {
  display: flex;
  gap: 1.5rem;
}
</style>
