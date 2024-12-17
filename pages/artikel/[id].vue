<template>
  <BaseMain>
    <div class="tablet:flex-nowrap mb-8 flex flex-wrap items-start gap-8">
      <JrvsProductGallery :images="images" class="tablet:w-1/2 shrink-0" />
      <UiDetails
        :amount="quantity"
        :title="article.title"
        :description="article.description"
        :price="price"
        :price-sale="priceSale"
        :is-sale="article._meta.sale"
        class="w-full"
        @update:amount="quantity = $event"
        @add-to-basket="addToBasket"
      >
        <JrvsInputSize
          v-model="selectedSize"
          label="Größe:"
          font-class="font-display"
          class="mb-4"
          :sizes="article.sizes.map((s: any) => ({ label: s.size, value: s._id }))"
        />
        <JrvsInputSize
          v-if="article._meta.lined"
          v-model="selectedLined"
          label="Abfüttern:"
          font-class="font-display"
          class="mb-4"
          :sizes="[
            { label: 'Abfüttern', value: 'lined' },
            { label: 'Nicht abfüttern', value: 'not-lined' },
          ]"
        />
      </UiDetails>
    </div>
  </BaseMain>
</template>

<script setup lang="ts">
import { JrvsProductGallery, JrvsInputSize } from "@jrvs-de/components";
const route = useRoute();
const router = useRouter();
const { quantity, addItem } = useBasket("article");

const { results: article } = await useApiData<Record<string, any>>(
  `/articles/${route.params.id}`
);

const selectedSize = computed({
  get: () => {
    return route.query.size || article.value.sizes[0]._id;
  },
  set: (value) => {
    router.replace({
      path: route.path,
      query: {
        ...route.query,
        size: value,
      },
    });
  },
});

const selectedLined = computed({
  get: () => {
    return route.query.lined || "not-lined";
  },
  set: (value) => {
    router.replace({
      path: route.path,
      query: {
        ...route.query,
        lined: value,
      },
    });
  },
});

const images = computed(() => {
  return article.value.gallery.length
    ? article.value.gallery
    : [{ url: article.value.preview }];
});

const activeSize = computed(() => {
  return (
    article.value.sizes.find((size: any) => size._id === selectedSize.value) ||
    article.value.sizes[0]
  );
});

const price = computed(() => {
  return selectedLined.value === "lined"
    ? activeSize.value.price.lined
    : activeSize.value.price.default;
});

const priceSale = computed(() => {
  return selectedLined.value === "lined"
    ? activeSize.value.price.saleLined
    : activeSize.value.price.saleDefault;
});

const addToBasket = () => {
  const linedTitle = selectedLined.value === "lined" ? " (Abgefüttert)" : "";

  addItem({
    productId: article.value._id,
    title: `${article.value.title}${linedTitle}`,
    description: article.value.shortDescription || article.value.description,
    price: article.value._meta.sale ? priceSale.value : price.value,
    link: `/artikel/${article.value._id}`,
    preview: article.value.preview,
    size: activeSize.value.size,
    _meta: {
      defaultPrice: price.value,
      sale: article.value._meta.sale,
    },
  });
};

useJsonld({
  "@context": "https://schema.org",
  "@type": "Product",
  name: article.value.title,
  image: article.value.preview,
  description: article.value.description,
  offers: article.value.sizes.map((size) => ({
    "@type": "Offer",
    sku: size._id,
    name: `${article.value.title} - ${size.size}`,
    price: size.price.default.toFixed(2),
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    itemCondition: "https://schema.org/NewCondition",
  })),
});

useHead({
  title: article.value.title,
});
</script>
