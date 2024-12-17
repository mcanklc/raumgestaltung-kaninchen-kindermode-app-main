<template>
  <div class="flex min-h-screen flex-col">
    <GlobalHeader />
    <div class="flex-1">
      <NuxtPage />
    </div>
    <GlobalFooter />
    <UiBasket />
  </div>
</template>

<script setup lang="ts">
useHead({
  titleTemplate(title) {
    return title
      ? `${title} | Kaninchen Kindermode - Handgefertigte Kindermode aus Berlin`
      : "Kaninchen Kindermode - Handgefertigte Kindermode aus Berlin";
  },
});
</script>
