<template>
  <div
    v-if="results?.length"
    class="tablet:grid-cols-3 desktop:grid-cols-4 grid grid-cols-2 gap-4"
  >
    <div v-for="result in results" :key="result._id">
      <JrvsProductCard
        v-if="result.hasOwnProperty('illustration')"
        :title="result.title"
        :price="result.sizes[0].price.default"
        :price-sale="result.sizes[0].price.saleDefault"
        :is-sale="result._meta.sale"
        :image-vector="(result as API.Kaninchen.Product).illustration"
        font-class="font-display"
        bg-class="bg-ci-secondary"
        @click="$router.push(`/selbst-gestalten/${result._id}`)"
      >
        <template #badges>
          <JrvsBadge v-if="result._meta.sale" title="Angebot" color="red" />
        </template>
        <template #title>
          <h2 class="h4">
            <NuxtLink
              :to="`/selbst-gestalten/${result._id}`"
              class="no-underline"
            >
              {{ result.title }}
            </NuxtLink>
          </h2>
        </template>
      </JrvsProductCard>
      <JrvsProductCard
        v-else
        :title="result.title"
        :price="result.sizes[0].price.default"
        :price-sale="result.sizes[0].price.saleDefault"
        :is-sale="result._meta.sale"
        :image-src="result.preview"
        :image-alt="result.title"
        font-class="font-display"
        bg-class="bg-ci-secondary"
        @click="$router.push(`/artikel/${result._id}`)"
      >
        <template #badges>
          <JrvsBadge v-if="result._meta.sale" title="Angebot" color="red" />
        </template>
        <template #title>
          <h2 class="h4">
            <NuxtLink :to="`/artikel/${result._id}`" class="no-underline">
              {{ result.title }}
            </NuxtLink>
          </h2>
        </template>
      </JrvsProductCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { JrvsProductCard, JrvsBadge } from "@jrvs-de/components";

const props = withDefaults(
  defineProps<{
    productId?: string;
    limit?: number;
    sort?: string;
  }>(),
  {
    productId: undefined,
    limit: 4,
    sort: "createdAt",
  }
);

const { results: articles } = await useApiData<API.Kaninchen.Article[]>(
  "/articles",
  {
    key: "articles-neuheiten",
    params: { limit: "50", sort: "-createdAt" },
  }
);

const { results: products } = await useApiData<API.Kaninchen.Product[]>(
  "/products",
  {
    key: "products-neuheiten",
    params: { limit: "50", sort: "-createdAt" },
  }
);

const results = computed(() => {
  return [...articles.value, ...products.value].slice(0, props.limit);
});
</script>
