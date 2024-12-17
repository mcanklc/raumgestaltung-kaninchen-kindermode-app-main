<template>
  <BaseMain>
    <UiIntro
      title="Selbst gestalten"
      intro="Bei uns kannst Du spielend leicht selbst Deine eigene Kinderkleidung entwerfen. Einfach das passende Kleidungsstück auswählen und anpassen."
    />
    <article
      v-for="category in categoriesWithProducts"
      :key="category._id"
      class="mb-32"
    >
      <div class="relative mb-4 h-[400px] overflow-hidden rounded-lg">
        <img
          :src="
            category.preview ??
            'https://cdn.jrvs.de/default/ea920a0f-1d79-4def-94a1-09aa83c6f0f1/ea920a0f-1d79-4def-94a1-09aa83c6f0f1_resized.jpg'
          "
          :alt="category.title"
          class="absolute h-full w-full object-cover"
        />
        <div class="relative z-20 h-full bg-black/50">
          <div class="container flex h-full items-center justify-center p-0">
            <div class="p-8 text-center text-white">
              <h1 class="font-display mb-4 text-5xl">{{ category.title }}</h1>
              <p class="mx-auto mb-8 max-w-lg">{{ category.description }}</p>
              <UiButton
                type="button"
                :title="`Alle ${category.title ?? 'Produkte'} ansehen`"
                @click="
                  $router.push({
                    path: `/selbst-gestalten`,
                    query: { categories: [category._id] },
                  })
                "
              />
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="category.products.length"
        class="tablet:grid-cols-3 desktop:grid-cols-4 grid grid-cols-2 gap-4"
      >
        <JrvsProductCard
          v-for="product in category.products"
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
    </article>
  </BaseMain>
</template>

<script setup lang="ts">
import { JrvsProductCard, JrvsBadge } from "@jrvs-de/components";
import { useMetaStore } from "~/store/meta";

const metaStore = useMetaStore();
const { results: products } = await useApiData("/products", {
  params: { limit: "9999", sort: "-updatedAt" },
});

const categoriesWithProducts = computed(() => {
  return metaStore.categories.items
    .map((category) => {
      const categoryProducts = products.value.filter((product: any) =>
        product.categories.includes(category._id)
      );

      return {
        ...category,
        products: categoryProducts
          .sort((a: any, b: any) =>
            a._meta.sale === b._meta.sale ? 0 : a._meta.sale ? -1 : 1
          )
          .slice(0, 4),
      };
    })
    .filter((category) => category.products.length);
});
</script>
