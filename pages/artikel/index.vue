<template>
  <BaseMain>
    <UiIntro :title="title" :intro="description" />
    <JrvsFilterBar
      v-model="activeFilters"
      :sort-options="sortOptions"
      :filters="filters"
      show-counters
    />
    <div
      v-if="results.length"
      class="tablet:grid-cols-3 desktop:grid-cols-4 grid grid-cols-2 gap-4"
    >
      <JrvsProductCard
        v-for="article in results"
        :key="article._id"
        :title="article.title"
        :price="article.sizes[0].price.default"
        :price-sale="article.sizes[0].price.saleDefault"
        :is-sale="article._meta.sale"
        :image-src="article.preview"
        :image-alt="article.title"
        font-class="font-display"
        bg-class="bg-ci-secondary"
        @click="$router.push(`/artikel/${article._id}`)"
      >
        <template #badges>
          <JrvsBadge v-if="article._meta.sale" title="Angebot" color="red" />
        </template>
        <template #title>
          <h2 class="h4">
            <NuxtLink :to="`/artikel/${article._id}`" class="no-underline">
              {{ article.title }}
            </NuxtLink>
          </h2>
        </template>
      </JrvsProductCard>
    </div>
    <p v-else class="m-4 text-center text-xl">Keine Ergebnisse</p>
    <JrvsPagination v-bind="meta" @navigate="handleNavigation" />
  </BaseMain>
</template>

<script setup lang="ts">
import {
  JrvsFilterBar,
  JrvsPagination,
  JrvsProductCard,
  JrvsBadge,
} from "@jrvs-de/components";
import { useMetaStore } from "~~/store/meta";

const metaStore = useMetaStore();

const sortOptions = [
  {
    label: "Name A-Z",
    value: "title",
  },
  {
    label: "Name Z-A",
    value: "-title",
  },
  {
    label: "Neueste",
    value: "createdAt",
  },
];

const filters = [
  metaStore.filterByCategories,
  // metaStore.filterByProductGroups,
  metaStore.filterBySeasons,
];

const { handleNavigation, meta, results, activeFilters } = await useListApiData(
  "/articles"
);

const title = computed(() => {
  if (activeFilters.value.categories) {
    return metaStore.categories.items.find(
      (category) => category._id === activeFilters.value.categories[0]
    ).title;
  } else {
    return "Artikel";
  }
});

const description = computed(() => {
  if (activeFilters.value.categories) {
    return (
      metaStore.categories.items.find(
        (category) => category._id === activeFilters.value.categories[0]
      ).description ||
      "Entdecke viele fertig konfigurierte Kleidungsstücke und Unikate."
    );
  } else {
    return "Entdecke viele fertig konfigurierte Kleidungsstücke und Unikate.";
  }
});

useHead({
  title: title.value,
});
</script>
