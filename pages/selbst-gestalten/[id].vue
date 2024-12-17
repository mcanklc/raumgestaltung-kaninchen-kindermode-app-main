<template>
  <BaseMain>
    <div class="tablet:flex-nowrap mb-8 flex flex-wrap items-start gap-8">
      <KaninchenEditor
        class="tablet:w-1/2 desktop:w-2/3 w-full shrink-0"
        :product-id="product._id"
        :options="product.options"
        :selected-options="selectedOptions"
        @select="handleOptionClick"
        @update="handleEditorUpdate"
      />
      <UiDetails
        v-model:amount="quantity"
        :title="product.title"
        :error="error"
        :price="price"
        :price-sale="priceSale"
        :is-sale="product._meta.sale"
        :description="product.description"
        class="grow-1 tablet:w-1/2 desktop:w-1/3 w-full min-w-0"
        @add-to-basket="addToBasket"
      >
        <JrvsInputSize
          v-model="selectedSize"
          label="Größe:"
          font-class="font-display"
          class="mb-4"
          :sizes="product.sizes.map((s) => ({ label: s.size, value: s._id }))"
        />
        <JrvsInputSize
          v-if="product._meta.lined"
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
    <!-- <h2 class="h2 mb-8">Inspirationen</h2>
    <KaninchenArticleList :product-id="product._id" /> -->
  </BaseMain>
</template>

<script setup lang="ts">
import { JrvsInputSize } from "@jrvs-de/components";
import { stringify } from "qs";
const route = useRoute();
const router = useRouter();
const description = ref("");
const illustration = ref("");
const error = ref("");
const { quantity, addItem } = useBasket("product");

const { results: product } = await useApiData<API.Kaninchen.Product>(
  `/products/${route.params.id}`
);

const selectedSize = computed({
  get: () => {
    return route.query.size || product.value.sizes[0]._id;
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

const selectedOptions = computed(() => {
  return route.query.options || {};
});

const activeSize = computed(() => {
  return (
    product.value.sizes.find((size) => size._id === selectedSize.value) ||
    product.value.sizes[0]
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
  if (
    Object.keys(selectedOptions.value).length < product.value.options.length
  ) {
    error.value = "Bitte wähle alle Optionen aus.";
    return;
  }

  error.value = "";

  const linedTitle = selectedLined.value === "lined" ? " (Abgefüttert)" : "";

  addItem({
    productId: product.value._id,
    title: `${product.value.title}${linedTitle}`,
    description: description.value,
    price: product.value._meta.sale ? priceSale.value : price.value,
    link: `/selbst-gestalten/${product.value._id}`,
    preview: illustration.value,
    size: activeSize.value.size,
    _meta: {
      defaultPrice: price.value,
      sale: product.value._meta.sale,
    },
  });
};

const handleOptionClick = (optionId: string, fabricId: string) => {
  router.replace({
    query: {
      ...route.query,
      options: {
        ...route.query.options,
        [optionId]: fabricId,
      },
    },
  });
};

const handleEditorUpdate = (payload: any) => {
  description.value = payload.description;
  illustration.value = payload.illustration;
};

useJsonld({
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.value.title,
  image: `https://api.jrvs.de/v2/kaninchen/illustration?${stringify({
    productId: product.value._id,
  })}`,
  description: product.value.description,
  offers: product.value.sizes.map((size) => ({
    "@type": "Offer",
    sku: size._id,
    name: `${product.value.title} - ${size.size}`,
    price: size.price.default.toFixed(2),
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    itemCondition: "https://schema.org/NewCondition",
  })),
});

useHead({
  title: product.value.title,
});
</script>
