<template>
  <li class="inline-block py-4 px-2">
    <RouterLink :to="href" class="no-underline hover:underline focus:underline">
      {{ title }}
    </RouterLink>
    <div
      v-if="children?.length"
      class="absolute top-full left-0 rounded-lg bg-bg-primary p-4 shadow-lg ring-1 ring-contrast-primary/10"
    >
      <ul>
        <li v-for="child in children" :key="child.text">
          <RouterLink :to="child.to">{{ child.text }}</RouterLink>
        </li>
      </ul>
    </div>
  </li>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string;
    href: string;
    children?: { to: string; text: string }[];
  }>(),
  {
    children: () => [],
  }
);
</script>
