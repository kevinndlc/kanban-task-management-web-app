<script lang="ts" setup>
import { ref } from 'vue';
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';

const props = defineProps<{
  current: string;
}>()

const emit = defineEmits<{
  (e: 'changeStatus', newStatus: string): void;
}>()

const statusList = ['Todo', 'Doing', 'Done'];
const selectedStatus = props.current ?? ref(statusList[0]);
</script>

<template>
  <Listbox v-model="selectedStatus" @update:model-value="emit('changeStatus', selectedStatus)">
    <div class="select-container">
      <ListboxButton class="select">{{ selectedStatus }}</ListboxButton>
      <ListboxOptions class="options">
        <ListboxOption
          v-for="status in statusList"
          :key="status"
          :value="status"
        >
          {{ status }}
        </ListboxOption>
      </ListboxOptions>
    </div>
  </Listbox>
</template>

<style lang="scss" scoped>
.select-container {
  position: relative;
  font-size: calc(13rem / 16);
  line-height: 23px;
}

.select {
  border: 1px solid var(--color-border);
  border-radius: 4px;
  width: 100%;
  justify-content: start;
  outline: none;
  padding: 0.5rem 1rem;

  &[aria-expanded='true'] {
    border-color: var(--color-accent);
  }

  &:focus-visible {
    border-color: var(--color-accent);
  }
}

.options {
  position: absolute;
  bottom: -4px;
  transform: translateY(100%);
  width: 100%;
  background-color: var(--color-background);
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
