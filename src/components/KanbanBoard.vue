<script setup lang="ts">
import PrimaryButton from '@/components/PrimaryButton.vue';
import KanbanColumn from '@/components/KanbanColumn.vue';
import type { SelectedBoardIntf } from '@/interfaces';
import { useKanban } from '@/stores/kanban';

defineProps<{
  board: SelectedBoardIntf;
}>();

const kanbanStore = useKanban();
</script>

<template>
  <div class="board__wrapper">
    <div v-if="!kanbanStore.availableStatus.length" class="board__no-column">
      <p>This Board is empty. Create a new column to get started</p>
      <PrimaryButton>+ Add New Column</PrimaryButton>
    </div>
    <div v-else class="board__columns" :key="kanbanStore.selectedBoard?.name">
      <KanbanColumn
        v-for="status of kanbanStore.availableStatus"
        :key="status"
        :status="status"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.board__wrapper {
  position: relative;
  padding: 1.5rem 1rem 3rem;
  overflow: auto;
  height: 100%;
  width: 100%;
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
