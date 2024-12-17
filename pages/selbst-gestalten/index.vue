<template>
  <BaseMain>
    <UiIntro
      title="Selbst gestalten"
      intro="Bei uns kannst Du spielend leicht selbst Deine eigene Kinderkleidung entwerfen. Einfach das passende Kleidungsstück auswählen und anpassen."
    />
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
        v-for="product in results"
        :key="product._id"
        :title="product.title"
        :price="product.sizes[0].price.default"
        :price-sale="product.sizes[0].price.saleDefault"
        :is-sale="product._meta.sale"
        :image-vector="product.illustration"
        font-class="font-display"
        bg-class="bg-ci-secondary"
        @click="$router.push(`/selbst-gestalten/${product._id}`)"
      >
        <template #badges>
          <JrvsBadge v-if="product._meta.sale" title="Angebot" color="red" />
        </template>
        <template #title>
          <h2 class="h4">
            <NuxtLink
              :to="`/selbst-gestalten/${product._id}`"
              class="no-underline"
            >
              {{ product.title }}
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
];

const filters = [
  metaStore.filterByCategories,
  metaStore.filterByProductGroups,
  metaStore.filterBySeasons,
];

const { handleNavigation, meta, results, activeFilters } = await useListApiData(
  "/products"
);

useHead({
  title: "Selbst gestalten",
});
</script>
