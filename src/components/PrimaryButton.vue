<script setup lang="ts">
defineProps<{
  color?: 'white';
}>();
</script>

<template>
  <button :class="color !== 'white' ? 'btn-primary' : 'btn-secondary'">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
button {
  padding-inline: 1.125rem;
  padding-block: 0.5rem;
  border-radius: 100vmax;
  transition: background-color 0.3s;
  font-weight: 700;
}

.btn-primary {
  background-color: var(--color-accent);
  color: var(--color-white);

  &:where(:focus, :hover) {
    background-color: var(--color-accent-hover);
  }
}

.btn-secondary {
  background-color: var(--color-button-2);
  color: var(--color-accent);

  &:where(:focus, :hover) {
    background-color: var(--color-button-2-hover);
  }
}
</style>
