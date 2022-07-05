<script setup lang="ts">
import TheHeader from './components/TheHeader.vue';
import KanbanBoard from './components/KanbanBoard.vue';
import { useKanban } from './stores/kanban';
import { onMounted, watchEffect } from 'vue';
import { useDark, useBreakpoints  } from '@vueuse/core';
import Sidebar from './components/Sidebar.vue';
import ShowSidebarIcon from './components/icons/ShowSidebarIcon.vue';

useDark();
const kanbanStore = useKanban();

const breakpoints = useBreakpoints({
  md: '35rem'
})

const isLargerThanMobile = breakpoints.greater('md')

watchEffect(() => {
  if (isLargerThanMobile.value) {
    kanbanStore.isSidebarOpen = true;
  } else {
    kanbanStore.isSidebarOpen = false;
  }
})

onMounted(() => {
  kanbanStore.fetchData();
});
</script>

<template>
  <TheHeader class="header" />
  <Sidebar class="sidebar" />

  <button v-if="!kanbanStore.isSidebarOpen" class="open-sidebar" @click="kanbanStore.isSidebarOpen = true">
    <ShowSidebarIcon />
    <span class="sr-only">Open Sidebar</span>
  </button>

  <main class="main">
    <KanbanBoard
      v-if="kanbanStore.selectedBoard"
      :board="kanbanStore.selectedBoard"
    />
  </main>
</template>

<style lang="scss">
@use './assets/sass/mixins';
@import './assets/base.scss';

#app {
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    'sidebar header'
    'sidebar main';
}

.header {
  grid-area: header;
}

.sidebar {
  grid-area: sidebar;
}

.main {
  grid-area: main;
}

.open-sidebar {
  display: none;
  position: absolute;
  bottom: 2rem;
  left: 0;
  width: 3.5rem;
  height: 3rem;
  background-color: var(--color-accent);
  border-radius: 0 100vmax 100vmax 0;
  justify-content: start;
  padding-inline-start: 1rem;
  cursor: pointer;
  z-index: 99;
  transition: opacity 200ms;

  &:hover {
    opacity: 0.8;
  }

  @include mixins.md {
    display: flex;
  }
}
</style>
