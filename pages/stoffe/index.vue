<template>
  <BaseMain>
    <UiIntro
      title="Stoffe"
      intro="Du bist selbst kreativ, und möchtest eigene Sachen für Deine Kleinen mit
      unseren Stoffen nähen? Kein Problem, hier findest Du eine große Auswahl
      unserer Stoffe zum selbst nähen."
    />
    <JrvsFilterBar
      v-model="activeFilters"
      :sort-options="sortOptions"
      :filters="filters"
      show-counters
    />
    <div
      v-if="results.length"
      class="grid grid-cols-2 gap-4 tablet:grid-cols-3 desktop:grid-cols-4"
    >
      <JrvsProductCard
        v-for="fabric in results"
        :key="fabric._id"
        :title="fabric.title"
        :price="fabric.price.default"
        :price-sale="fabric.price.saleDefault"
        :is-sale="fabric._meta.sale"
        :image-src="fabric.preview"
        font-class="font-display"
        @click="$router.push(`/stoffe/${fabric._id}`)"
      >
        <template #badges>
          <!-- <JrvsBadge title="Neuheit" color="bg-ci-primary" /> -->
          <JrvsBadge v-if="fabric._meta.sale" title="Angebot" color="red" />
        </template>
        <template #title>
          <h2 class="h4">
            <NuxtLink :to="`/stoffe/${fabric._id}`" class="no-underline">
              {{ fabric.title }}
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
    label: "Preis aufsteigend",
    value: "price.default",
  },
  {
    label: "Preis absteigend",
    value: "-price.default",
  },
];

const filters = [
  metaStore.filterByFabricCategories,
  metaStore.filterByFabricMaterials,
  metaStore.filterBySeasons,
];

const { handleNavigation, meta, results, activeFilters } = await useListApiData(
  "/fabrics",
  {
    "_meta.buyable": "true",
  }
);

useHead({
  title: "Stoffe",
});
</script>
