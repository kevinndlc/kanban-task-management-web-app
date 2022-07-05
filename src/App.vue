<script setup lang="ts">
import TheHeader from './components/TheHeader.vue';
import KanbanBoard from './components/KanbanBoard.vue';
import { useKanban } from './stores/kanban';
import { onMounted } from 'vue';
import { useDark } from '@vueuse/core';

useDark();

const kanbanStore = useKanban();

onMounted(() => {
  kanbanStore.fetchData();
});
</script>

<template>
  <TheHeader />

  <main>
    <KanbanBoard
      v-if="kanbanStore.selectedBoard"
      :board="kanbanStore.selectedBoard"
    />
  </main>
</template>

<style lang="scss">
@import './assets/base.scss';

#app {
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
}
</style>
