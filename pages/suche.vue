<template>
  <BaseMain>
    <UiIntro title="Suchergebnisse">
      <template #default>
        <p v-if="!query" class="mb-8">Bitte geben Sie einen Suchbegriff ein.</p>
        <p v-else-if="query && results.length" class="mb-8">
          Deine Suche nach <strong>"{{ query }}"</strong> ergab
          <strong>{{ meta.totalResults }}</strong> Treffer:
        </p>
        <p v-else class="mb-8">
          Deine Suche nach <strong>"{{ query }}"</strong> ergab leider keine
          Treffer.
        </p>
      </template>
    </UiIntro>
    <div
      v-if="results.length"
      class="tablet:grid-cols-3 desktop:grid-cols-4 grid grid-cols-2 gap-4"
    >
      <div v-for="result in results" :key="result._id">
        <template v-if="result._search.type === 'products'">
          <JrvsProductCard
            :title="result.title"
            :price="result.sizes[0].price.default"
            :price-sale="result.sizes[0].price.saleDefault"
            :is-sale="result._meta.sale"
            :image-vector="result.illustration"
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
        </template>
        <template v-else-if="result._search.type === 'articles'">
          <JrvsProductCard
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
        </template>
        <template v-else-if="result._search.type === 'fabrics'">
          <JrvsProductCard
            :title="result.title"
            :price="result.price.default"
            :price-sale="result.price.saleDefault"
            :is-sale="result._meta.sale"
            :image-src="result.preview"
            font-class="font-display"
            @click="$router.push(`/stoffe/${result._id}`)"
          >
            <template #badges>
              <!-- <JrvsBadge title="Neuheit" color="bg-ci-primary" /> -->
              <JrvsBadge v-if="result._meta.sale" title="Angebot" color="red" />
            </template>
            <template #title>
              <h2 class="h4">
                <NuxtLink :to="`/stoffe/${result._id}`" class="no-underline">
                  {{ result.title }}
                </NuxtLink>
              </h2>
            </template>
          </JrvsProductCard>
        </template>
      </div>
    </div>
    <p v-else class="m-4 text-center text-xl">Keine Ergebnisse</p>
  </BaseMain>
</template>

<script setup lang="ts">
import { JrvsProductCard, JrvsBadge } from "@jrvs-de/components";

const route = useRoute();

const query = computed(() => route.query.q);

const { results, meta } = await useListApiData("/search", undefined, {
  key: `search-${query.value}`,
});
</script>
