<script setup lang="ts">
import TheHeader from "./components/TheHeader.vue";
import KanbanBoard from "./components/KanbanBoard.vue";
import data from '@/assets/data.json';

console.log(data);

</script>

<template>
  <TheHeader />

  <main class="main">
    <KanbanBoard :board="data.boards[0]" />
  </main>
</template>

<style lang="scss">
@import './assets/base.scss';

#app {
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
}

.main {
  padding: 1.5rem 1rem 0;
  overflow: auto;
}
</style>
