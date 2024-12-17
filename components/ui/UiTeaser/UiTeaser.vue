<template>
  <div
    class="relative h-36 min-w-[256px] max-w-[799px] grow overflow-hidden rounded-lg transition-shadow"
    :class="{
      'focus-within:ring-ci-primary hover:ring-ci-primary focus-within:ring-2 hover:ring-2':
        cta && cta.href,
    }"
  >
    <img
      v-if="image"
      class="absolute inset-0 rounded-lg object-cover"
      :src="image.src"
      :alt="image.alt"
    />
    <div
      class="relative z-10 flex h-full items-center rounded-lg bg-gradient-to-r from-black/75 p-4 pr-16 text-white"
    >
      <Component :is="titleElement" class="font-display block text-2xl">
        <span v-if="subtitle" class="font-body mb-1 block text-xs">
          {{ subtitle }}
        </span>
        {{ title }}
      </Component>
      <RouterLink
        v-if="cta && cta.href"
        :to="cta.href"
        class="absolute inset-0 z-20"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    image?: {
      src: string;
      alt?: string;
    };
    title: string;
    subtitle?: string;
    cta?: {
      title?: string;
      href?: string;
    };
    titleElement?: "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  }>(),
  {
    image: undefined,
    subtitle: undefined,
    cta: undefined,
    titleElement: "span",
  }
);
</script>
