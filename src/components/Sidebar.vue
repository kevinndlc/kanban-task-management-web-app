<script setup lang="ts">
import { useKanban } from '@/stores/kanban';
import BoardIcon from './icons/BoardIcon.vue';
import LightThemeIcon from './icons/LightThemeIcon.vue';
import DarkThemeIcon from './icons/DarkThemeIcon.vue';
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark();
const toggleDark = useToggle(isDark);

const kanbanStore = useKanban();
</script>

<template>
  <nav class="sidebar">
    <h2 class="sidebar__title">All Boards ({{ kanbanStore.boards.length }})</h2>
    <ul class="board-list">
      <li
        v-for="board in kanbanStore.boards"
        :key="board.name"
        @click="kanbanStore.selectedBoard = board"
        class="board-item"
        :class="kanbanStore.selectedBoard === board && 'active'"
      >
        <BoardIcon class="board-item__icon" />
        <span class="board-item__name">{{ board.name }}</span>
      </li>
      <li class="board-item add-board">
        <BoardIcon class="board-item__icon" />
        <span>+ Create New Board</span>
      </li>
    </ul>
    <div class="theme-toggle-wrapper">
      <LightThemeIcon class="light-theme-icon" />
      <input type="checkbox" id="theme" :checked="isDark" @change="toggleDark()" />
      <label for="theme" aria-label="Light Mode" />
      <DarkThemeIcon class="dark-theme-icon" />
    </div>
  </nav>
</template>

<style scoped lang="scss">
.sidebar {
  position: absolute;
  z-index: 99;
  width: calc(264rem / 16);
  background-color: var(--color-foreground);
  left: 0;
  bottom: -2.25rem;
  transform: translateY(100%);
  border-radius: 0.5rem;
  box-shadow: 0px 10px 20px rgba(54, 78, 126, 0.25);

  &__title {
    text-transform: uppercase;
    color: var(--color-text);
    font-size: 0.75rem;
    letter-spacing: 2.4px;
    padding-inline: 1.5rem;
    padding-block-start: 1rem;
    margin-block-end: 1.25rem;
  }
}

.board-item {
  display: flex;
  gap: 0.75rem;
  cursor: pointer;
  padding-inline-start: 1.5rem;
  font-weight: 700;
  font-size: calc(15rem / 16);
  line-height: calc(19rem / 16);
  padding-block: 0.875rem;
  margin-inline-end: 1.5rem;
  border-radius: 0 100vmax 100vmax 0;
  transition: all 0.2s;

  &:hover {
    opacity: 0.8;
  }

  &.active {
    background-color: var(--color-accent);
    color: white;
  }

  &.add-board {
    color: var(--color-accent);
  }

  &__icon {
    width: 1rem;
    aspect-ratio: 1;
  }
}

.theme-toggle-wrapper {
  background-color: var(--color-border);
  margin: 1rem;
  border-radius: 6px;
  height: 3rem;
  display: flex;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;

  input[type='checkbox'] {
    display: none;

    &:checked + label::after {
      transform: translateX(20px);
    }
  }

  label {
    width: 40px;
    height: 20px;
    background-color: var(--color-accent);
    border-radius: 100vmax;
    position: relative;
    cursor: pointer;

    &::after {
      content: '';
      width: 14px;
      aspect-ratio: 1;
      background-color: white;
      border-radius: 50%;
      position: absolute;
      top: 3px;
      left: 3px;
      transition: transform 300ms;
    }
  }

  .light-theme-icon {
    width: 18px;
    aspect-ratio: 1;
  }

  .dark-theme-icon {
    width: 15px;
    aspect-ratio: 1;
  }
}
</style>
