<script setup lang="ts">
import PlusIcon from './icons/PlusIcon.vue';
import VerticalEllipsisIcon from './icons/VerticalEllipsisIcon.vue';
import ChevronDownIcon from './icons/ChevronDownIcon.vue';
</script>

<template>
  <header class="header">
    <img src="@/assets/images/logo-mobile.svg" alt="Kanban Logo" />

    <button class="header__toggle_sidebar_btn">
      <h1 class="header__title">Platform Launch</h1>
      <ChevronDownIcon class="header__toggle_sidebar-icon" />
    </button>

    <div class="header__actions">
      <button
        class="header__add-task-btn"
        style="opacity: 0.25; cursor: default"
        disabled
      >
        <PlusIcon class="header__add-task-icon" />
      </button>
      <button class="header__more-btn">
        <VerticalEllipsisIcon class="header__more-icon" />
      </button>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  height: 4rem;
  background: var(--color-foreground);
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  &__toggle_sidebar_btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &__title {
    font-size: 1.125rem;
  }

  &__toggle_sidebar-icon {
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
  }

  &__add-task-icon {
    width: 0.75rem;
    aspect-ratio: 1;
  }
}
</style>
