<script setup lang="ts">
import PrimaryButton from '@/components/PrimaryButton.vue';
import KanbanColumn from '@/components/KanbanColumn.vue';
import type { BoardIntf } from '@/interfaces';

defineProps<{
  board: BoardIntf;
}>();
</script>

<template>
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

.board__columns {
  display: flex;
  gap: 1.5rem;
}
</style>
