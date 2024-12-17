<template>
  <div class="teaser-grid flex flex-wrap justify-center items-center -m-2">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style>
.teaser-grid > * {
  @apply flex-1 m-2;
}
</style>
