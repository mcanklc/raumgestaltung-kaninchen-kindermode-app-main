<template>
  <div :class="{ 'text-center': center }">
    <h1 class="h3 mb-4">{{ title }}</h1>
    <slot>
      <p
        v-if="intro"
        class="mb-8 max-w-3xl text-sm"
        :class="{ 'mx-auto': center }"
      >
        {{ intro }}
      </p>
    </slot>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string;
    intro?: string;
    center?: boolean;
  }>(),
  {
    intro: undefined,
    center: false,
  }
);
</script>
