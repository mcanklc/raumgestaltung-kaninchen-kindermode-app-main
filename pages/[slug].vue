<template>
  <BaseMain>
    <div v-if="data" class="prose" v-html="data.content" />
  </BaseMain>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const route = useRoute();

const slug = computed(() => route.params.slug);

const { data, refresh } = await useFetch<API.Kaninchen.StaticPage | null>(
  `${runtimeConfig.public.apiUrl}/static-pages/slug/${slug.value}`,
  {
    key: `static-page-${slug.value}`,
    watch: [slug.value],
  }
);

if (!data.value) {
  throw createError({
    statusCode: 404,
    message: `Seite "/${slug.value}" konnte nicht gefunden werden.`,
  });
}

watch(
  () => slug.value,
  () => {
    refresh();
  }
);

useHead({
  title: data.value.title,
});
</script>
