<template>
  <BaseMain full-width>
    <HomeSlider class="-mt-8" />
    <div class="container py-4">
      <UiTeaserGrid>
        <UiTeaser
          v-for="teaser in teasers"
          :key="teaser.id"
          v-bind="teaser"
          title-element="h2"
        />
      </UiTeaserGrid>
    </div>
    <div class="tablet:flex container items-center py-16">
      <div class="tablet:mb-0 tablet:w-1/2 mb-8">
        <h2 class="h2 mb-4">Kinderkleidung selbst gestalten</h2>
        <p class="text-contrast-secondary mb-8">
          Bei uns kannst Du spielend leicht Deine eigene Kinderkleidung
          entwerfen. Einfach ein Kleidungsstück Deiner Wahl auswählen, Stoffe
          auswählen und fertig ist Dein ganz persönliches Kleidungsstück.
        </p>
        <ul class="-m-2 mb-6 flex flex-wrap items-center">
          <li
            v-for="(highlight, index) in configuratorHighlights"
            :key="`highlight-${index}`"
            class="m-2 flex items-center"
          >
            <span class="icon text-ci-primary mr-2 block" aria-hidden="true">
              check
            </span>
            <h3 class="font-bold">{{ highlight }}</h3>
          </li>
        </ul>
        <UiButton
          type="link"
          to="/selbst-gestalten/uebersicht"
          title="Gleich loslegen"
        />
      </div>
      <div class="tablet:w-1/2 tablet:pl-16">
        <ul class="grid grid-cols-2 gap-4">
          <li v-for="product in results" :key="product._id">
            <NuxtLink
              :to="`/selbst-gestalten/${product._id}`"
              class="bg-ci-secondary hover:bg-ci-secondary/50 relative block aspect-square rounded-lg p-4 transition-colors"
            >
              <img :src="getProductPreview(product._id)" class="object-cover" />
              <h3
                class="font-display absolute bottom-0 left-0 w-full p-4 text-center text-xs"
              >
                {{ product.title }}
              </h3>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="container py-16">
      <h2 class="h2 mb-4">Unsere Neuheiten</h2>
      <HomeNewArticles :limit="8" />
    </div>
    <div class="container py-8">
      <h2 class="h2 mb-4">Selbst gestalten</h2>
      <p>
        Gestalte Deine ganz persönliche "Handmade" Kinderkleidung mit unserem
        einfachen Online-Editor. Wähle aus vielen verschiedenen Stoffen und
        Produkten, um Dein individuelles Kleidungsstück in den Händen zu halten.
      </p>
    </div>
    <div class="container py-8">
      <h2 class="h2 mb-4">Über uns</h2>
      <p>
        "Liebevoll hergestellte Kinderkleidung zum selber gestalten." - Aus
        diesem Gedanken heraus wurde die Idee für unseren Online-Shop "Kaninchen
        Kindermode" geboren. Unser Ziel ist es, handgefertigte, individuell nach
        Deinen Wünschen gefertigte Kinderkleidung in BIO-Qualität anzubieten.
      </p>
    </div>
  </BaseMain>
</template>

<script setup lang="ts">
import { computed } from "vue";
import HomeSlider from "../components/home/HomeSlider/HomeSlider.vue";
import UiButton from "../components/ui/UiButton/UiButton.vue";
import UiTeaser from "../components/ui/UiTeaser/UiTeaser.vue";
import UiTeaserGrid from "../components/ui/UiTeaserGrid/UiTeaserGrid.vue";
import { useConfigStore } from "@/store/config";
import BaseMain from "@/components/base/BaseMain/BaseMain.vue";

const configStore = useConfigStore();
const teasers = computed(() => {
  return configStore.remoteConfig.home?.teaser?.map((teaser, index) => ({
    id: `teaser-${index}`,
    ...teaser,
  }));
});

const configuratorHighlights = [
  "Über 250 Stoffe",
  "Mehr als 30 Produkte",
  "100% BIO-Qualität",
];

const { results } = await useApiData<API.Kaninchen.Product[]>("products", {
  params: {
    limit: "4",
    sort: "-createdAt",
  },
});

const getProductPreview = (productId: string) => {
  return `${
    useRuntimeConfig().public.apiUrl
  }/illustration?productId=${productId}`;
};
</script>
