<script setup lang="ts">
import PlusIcon from './icons/PlusIcon.vue';
import VerticalEllipsisIcon from './icons/VerticalEllipsisIcon.vue';
import ChevronDownIcon from './icons/ChevronDownIcon.vue';
import ChevronUpIcon from './icons/ChevronUpIcon.vue';
import Sidebar from './Sidebar.vue';
import { useKanban } from '@/stores/kanban';

const kanbanStore = useKanban();
</script>

<template>
  <header class="header">
    <img src="@/assets/images/logo-mobile.svg" class="header__logo" alt="Kanban Logo" />

    <div class="header__sidebar-wrapper" v-if="kanbanStore.selectedBoard">
      <h1 class="header__title">{{ kanbanStore.selectedBoard.name }}</h1>
      <button class="header__toggle-sidebar-btn" @click="kanbanStore.isSidebarOpen = !kanbanStore.isSidebarOpen">
        <h1 class="header__title-mobile">{{ kanbanStore.selectedBoard.name }}</h1>
        <ChevronDownIcon v-if="!kanbanStore.isSidebarOpen" class="header__toggle-sidebar-icon" />
        <ChevronUpIcon v-else class="header__toggle-sidebar-icon" />
      </button>
      <Sidebar isMobile />
    </div>

    <div class="header__actions">
      <button
        class="header__add-task-btn"
        style="opacity: 0.25; cursor: default"
        disabled
      >
        <PlusIcon class="header__add-task-icon" />
        <span>+ Add New Task</span>
      </button>
      <button class="header__more-btn">
        <VerticalEllipsisIcon class="header__more-icon" />
      </button>
    </div>
  </header>
</template>

<style scoped lang="scss">
@use '@/assets/sass/mixins';
.header {
  height: 4rem;
  background: var(--color-foreground);
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  @include mixins.md {
    border-bottom: 1px solid var(--color-border);
    height: 5rem;
  }

  &__logo {
    @include mixins.md {
      display: none;
    }
  }

  &__sidebar-wrapper {
    position: relative;
  }

  &__toggle-sidebar-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    @include mixins.md {
      display: none;
    }
  }

  &__title {
    display: none;
    @include mixins.md {
      display: revert;
    }
  }

  &__title,
  &__title-mobile {
    font-size: 1.125rem;
  }

  &__toggle-sidebar-icon {
    width: 0.5rem;
  }

  &__actions {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  &__add-task-btn {
    background-color: var(--color-accent);
    height: 2rem;
    width: 3rem;
    border-radius: 100vmax;
    color: var(--color-white);

    @include mixins.md {
      width: auto;
      height: 3rem;
      padding-inline: 1.5rem;
    }
    
    svg {
      @include mixins.md {
        display: none;
      }
    }

    span {
      display: none; 

      @include mixins.md {
        display: revert;
      }
    }
  }

  &__add-task-icon {
    width: 0.75rem;
    aspect-ratio: 1;
  }
}
</style>
