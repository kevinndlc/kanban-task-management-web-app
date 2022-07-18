<script setup lang="ts">
import TheHeader from './components/TheHeader.vue';
import KanbanBoard from './components/KanbanBoard.vue';
import { useKanban } from './stores/kanban';
import { onMounted, watchEffect } from 'vue';
import { breakpoints } from './utils/breakpoints';
import Sidebar from './components/Sidebar.vue';
import ShowSidebarIcon from './components/icons/ShowSidebarIcon.vue';
import logoDark from './assets/images/logo-dark.svg';
import logoLight from './assets/images/logo-light.svg';

const kanbanStore = useKanban();

const isMobile = breakpoints.smaller('md');

watchEffect(() => {
  if (!isMobile.value) {
    kanbanStore.isSidebarOpen = true;
  } else {
    kanbanStore.isSidebarOpen = false;
  }
});

onMounted(async () => {
  await kanbanStore.fetchData();
});
</script>

<template>
  <div class="layout" :class="!kanbanStore.isSidebarOpen && 'no-sidebar'">
    <TheHeader class="header" />
    <div class="logo">
      <img v-if="kanbanStore.isDark" :src="logoLight" alt="Logo" />
      <img v-else :src="logoDark" alt="Logo" />
    </div>
    <Sidebar class="sidebar" />
    <button
      v-if="!kanbanStore.isSidebarOpen"
      class="open-sidebar"
      @click="kanbanStore.isSidebarOpen = true"
    >
      <ShowSidebarIcon />
      <span class="sr-only">Open Sidebar</span>
    </button>
    <main class="main">
      <KanbanBoard
        v-if="kanbanStore.selectedBoard"
        :board="kanbanStore.selectedBoard"
      />
      <div
        v-if="kanbanStore.isSidebarOpen && isMobile"
        class="backdrop"
        @click="kanbanStore.isSidebarOpen = false"
      />
    </main>
  </div>
</template>

<style lang="scss">
@use './assets/sass/mixins';
@import './assets/base.scss';

#app {
  height: 100%;
}

.layout {
  height: 100%;
  display: grid;
  grid-template-rows: auto calc(100% - 4rem);
  grid-template-columns: auto 1fr;
  grid-template-areas:
    'logo header'
    'sidebar main';

  @include mixins.md {
    grid-template-rows: auto calc(100% - 5rem);
  }

  &.no-sidebar {
    grid-template-areas:
      'logo header'
      'main main';

    .logo {
      border-bottom: 1px solid var(--color-border);
    }
  }
}

.header {
  grid-area: header;
}

.logo {
  grid-area: logo;
  display: none;
  align-items: center;
  padding-inline: 1.625rem;
  background-color: var(--color-foreground);
  border-right: 1px solid var(--color-border);

  @include mixins.md {
    display: flex;
  }
}

.sidebar {
  grid-area: sidebar;
}

.main {
  grid-area: main;
  position: relative;
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

.backdrop {
  position: absolute;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
}

::-webkit-scrollbar {
  height: 0.5rem;
  width: 0.5rem;
}

::-webkit-scrollbar-thumb {
  background-color: var(--color-accent);
  border-radius: 100vmax;
}
</style>
