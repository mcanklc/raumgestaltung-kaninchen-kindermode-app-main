<template>
  <li class="inline-block p-1">
    <RouterLink :to="href" class="no-underline hover:underline focus:underline">
      {{ title }}
    </RouterLink>
  </li>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  href: string;
}>();
</script>
