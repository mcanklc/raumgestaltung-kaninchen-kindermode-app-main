<template>
  <BaseMain>
    <div class="tablet:flex-nowrap mb-8 flex flex-wrap items-start gap-8">
      <JrvsProductGallery :images="images" class="tablet:w-1/2 shrink-0" />
      <UiDetails
        :amount="quantity"
        :title="fabric.title"
        :description="fabric.description"
        :price="fabric.price.default"
        :price-sale="fabric.price.saleDefault"
        :is-sale="fabric._meta.sale"
        class="w-full"
        @update:amount="quantity = $event"
        @add-to-basket="addToBasket"
      >
        <template #amount>
          <JrvsInputAmount
            v-model="quantity"
            label="Menge:"
            :steps="0.1"
            :min="0.5"
            :max="fabric._meta.stock"
            note="Meter"
            class="mb-4"
          />
        </template>
      </UiDetails>
    </div>
  </BaseMain>
</template>

<script setup lang="ts">
import { JrvsProductGallery, JrvsInputAmount } from "@jrvs-de/components";
const route = useRoute();
const { quantity, addItem } = useBasket("fabric");

const { results: fabric } = await useApiData<Record<string, any>>(
  `/fabrics/${route.params.id}`
);

const images = computed(() => {
  return fabric.value.gallery.length
    ? fabric.value.gallery
    : [{ url: fabric.value.preview }];
});

const addToBasket = () => {
  addItem({
    productId: fabric.value._id,
    title: fabric.value.title,
    description: fabric.value.description,
    price: fabric.value._meta.sale
      ? fabric.value.price.sale
      : fabric.value.price.default,
    link: `/stoffe/${fabric.value._id}`,
    preview: fabric.value.preview,
    _meta: {
      defaultPrice: fabric.value.price.default,
      sale: fabric.value._meta.sale,
    },
  });
};

useJsonld({
  "@context": "https://schema.org",
  "@type": "Product",
  name: fabric.value.title,
  image: fabric.value.gallery.map((image) => image.url),
  description: fabric.value.description,
  offers: {
    "@type": "Offer",
    price: fabric.value.price.default,
    priceCurrency: "EUR",
    itemCondition: "https://schema.org/NewCondition",
    availability: "https://schema.org/InStock",
  },
});

useHead({
  title: fabric.value.title,
});
</script>
