<template>
  <main>
    <div class="py-8" :class="{ container: !fullWidth }">
      <slot />
    </div>
  </main>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    fullWidth?: boolean;
  }>(),
  {
    fullWidth: false,
  }
);
</script>
