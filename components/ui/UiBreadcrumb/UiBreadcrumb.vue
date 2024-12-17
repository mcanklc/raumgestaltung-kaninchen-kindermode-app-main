<template>
  <nav aria-label="Breadcrumb" class="container pt-6">
    <ol role="list" class="flex items-center space-x-2">
      <li>
        <RouterLink
          to="/"
          class="text-contrast-tertiary hover:text-contrast-secondary"
        >
          <svg
            class="shrink-0 w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
            />
          </svg>
          <span class="sr-only">Startseite</span>
        </RouterLink>
      </li>
      <li v-for="page in pages" :key="page.title">
        <div class="flex items-center">
          <svg
            class="shrink-0 w-5 h-5 text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
          </svg>
          <router-link
            :to="page.href"
            class="ml-2 text-sm font-medium text-contrast-tertiary hover:text-contrast-secondary"
            :aria-current="page.current ? 'page' : undefined"
          >
            {{ page.title }}
          </router-link>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    pages: {
      title: string;
      href: string;
      current?: boolean;
    }[];
  }>(),
  {}
);
</script>
