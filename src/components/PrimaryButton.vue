<script setup lang="ts">

</script>

<template>
  <button class="btn-primary">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
  .btn-primary {
    background-color: var(--color-accent);
    color: var(--color-white);
    height: 3rem;
    padding-inline: 1.125rem;
    border-radius: 100vmax;
    transition: background-color 0.3s ease-out;

    &:where(:focus, :hover) {
      background-color: var(--color-accent-hover);
    }
  }
</style>