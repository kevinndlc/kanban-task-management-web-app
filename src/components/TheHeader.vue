<script setup lang="ts">
import PlusIcon from './icons/PlusIcon.vue';
import VerticalEllipsisIcon from './icons/VerticalEllipsisIcon.vue';
import ChevronDownIcon from './icons/ChevronDownIcon.vue';
import ChevronUpIcon from './icons/ChevronUpIcon.vue';
import Sidebar from './Sidebar.vue';
import { useKanban } from '@/stores/kanban';
import Modal from './Modal.vue';
import { reactive, ref, watch } from 'vue';
import PrimaryButton from './PrimaryButton.vue';
import CrossIcon from './icons/CrossIcon.vue';
import StatusListbox from './StatusListbox.vue';

const kanbanStore = useKanban();

const showModal = ref(false);

const newTask = reactive({
  title: '',
  description: '',
  subtasks: [''],
  status: ''
})

watch(showModal, () => (newTask.subtasks = ['']));

function handleCreateTask(e: Event) {
  e.preventDefault();
}
</script>

<template>
  <header class="header">
    <img
      src="@/assets/images/logo-mobile.svg"
      class="header__logo"
      alt="Kanban Logo"
    />

    <div class="header__sidebar-wrapper" v-if="kanbanStore.selectedBoard">
      <h1 class="header__title">{{ kanbanStore.selectedBoard.name }}</h1>
      <button
        class="header__toggle-sidebar-btn"
        @click="kanbanStore.isSidebarOpen = !kanbanStore.isSidebarOpen"
      >
        <h1 class="header__title-mobile">
          {{ kanbanStore.selectedBoard.name }}
        </h1>
        <ChevronDownIcon
          v-if="!kanbanStore.isSidebarOpen"
          class="header__toggle-sidebar-icon"
        />
        <ChevronUpIcon v-else class="header__toggle-sidebar-icon" />
      </button>
      <Sidebar isMobile />
    </div>

    <div class="header__actions">
      <button
        class="header__add-task-btn"
        :disabled="!kanbanStore.availableStatus.length"
        @click="showModal = true"
      >
        <PlusIcon class="header__add-task-icon" />
        <span>+ Add New Task</span>
      </button>
      <button class="header__more-btn">
        <VerticalEllipsisIcon class="header__more-icon" />
      </button>
    </div>
    <Modal title="Add New Task" :is-open="showModal" @close="showModal = false">
      <form class="add-task-form">
        <div>
          <label for="title">Title</label>
          <input type="text" v-model="newTask.title" id="title" placeholder="e.g. Take coffee break" />
        </div>
        <div>
          <label for="description">Description</label>
          <textarea
            v-model="newTask.description"
            id="description"
            rows="4"
            placeholder="e.g. It's alaways good to take a break. This 15 minute break will recharge the batteries a little."
          />
        </div>
        <div>
          <label>Subtasks</label>
          <div class="subtasks">
            <div
              v-for="(subtask, index) in newTask.subtasks"
              :key="index"
              class="subtask"
            >
              <input type="text" placeholder="e.g. Make coffee" v-model="newTask.subtasks[index]" />
              <button
                type="button"
                @click="
                  () => {
                    newTask.subtasks.splice(index, 1);
                  }
                "
              >
                <CrossIcon />
                <span class="sr-only">Delete this subtask</span>
              </button>
            </div>
            <PrimaryButton
              color="white"
              type="button"
              @click="newTask.subtasks.push('')"
              >+ Add New Subtask</PrimaryButton
            >
          </div>
        </div>
        <div>
          <label for="status">Status</label>
          <StatusListbox />
        </div>
        <PrimaryButton @click="handleCreateTask">Create Task</PrimaryButton>
      </form>
    </Modal>
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

    &:disabled {
      opacity: 0.7;
      cursor: default;
    }

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

    &:disabled {
      opacity: 0.25;
      cursor: default;
    }
  }
}

.add-task-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  label {
    display: block;
    font-size: 0.75rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
    color: var(--color-text-3);
  }

  button {
    font-size: calc(13rem / 16);
    line-height: 23px;
  }

  input,
  textarea,
  button {
    width: 100%;
  }

  input,
  textarea {
    background-color: transparent;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    outline: 0;
    padding: 0.5rem 1rem;
    font-size: calc(13rem / 16);
    line-height: 23px;

    &:focus-visible {
      border-color: var(--color-accent);
    }
  }

  .subtasks {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .subtask {
    display: flex;
    align-items: center;
    gap: 1rem;

    input {
      flex-grow: 1;
    }

    button {
      width: auto;
      color: var(--color-medium-gray);
      transition: color 0.2s;
      outline: none;

      &:where(:hover, :focus-visible) {
        color: var(--color-danger);
      }
    }
  }
}

#description {
  resize: none;
}
</style>
