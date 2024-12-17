<template>
  <li class="flex items-start py-8 text-sm tablet:items-center">
    <img
      :src="preview"
      :alt="title"
      class="aspect-[3/4] w-24 flex-none rounded-lg border border-gray-200 object-cover"
    />
    <div
      class="ml-4 grid flex-auto grid-cols-1 grid-rows-1 items-start gap-y-3 gap-x-5 tablet:ml-6 tablet:flex tablet:items-center tablet:gap-0"
    >
      <div class="row-end-1 flex-auto tablet:pr-6">
        <h3 class="font-medium text-gray-900">
          <NuxtLink :to="link">
            {{ title }}
            <span v-if="size"> - {{ size }}</span>
          </NuxtLink>
        </h3>
        <p class="mt-1 text-gray-500 line-clamp-3">
          {{ description }}
        </p>
        <div class="pt-2 text-xs">
          <button
            type="button"
            class="flex items-center text-gray-400 hover:text-gray-500"
            @click="emit('remove')"
          >
            <TrashIcon class="mr-1 h-4 w-4 text-inherit" aria-hidden="true" />
            Entfernen
          </button>
        </div>
      </div>
      <p
        class="row-span-2 row-end-2 font-display text-2xl font-bold text-gray-900 tablet:order-1 tablet:ml-6 tablet:flex-none tablet:text-right"
      >
        {{ usePriceFilter(price) }}
      </p>
      <div
        v-if="editQuantity"
        class="flex items-center tablet:block tablet:flex-none tablet:text-center"
      >
        <JrvsInputAmount
          :model-value="quantity"
          :note="type === 'fabric' ? 'Meter' : 'Stück'"
          :steps="type === 'fabric' ? 0.1 : 1"
          :min="type === 'fabric' ? 0.5 : 1"
          @update:model-value="emit('update:quantity', $event)"
        />
      </div>
      <div v-else>{{ quantity }}</div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { JrvsInputAmount } from "@jrvs-de/components";
import { TrashIcon } from "@heroicons/vue/20/solid";

withDefaults(
  defineProps<{
    itemId: string;
    productId: string;
    type: string;
    title: string;
    description: string;
    price: number;
    quantity: number;
    link: string;
    preview: string;
    size?: string;
    // eslint-disable-next-line vue/prop-name-casing
    _meta?: {
      defaultPrice?: number;
      sale?: boolean;
    };
    editQuantity?: boolean;
  }>(),
  {
    size: undefined,
    _meta: undefined,
    editQuantity: true,
  }
);

const emit = defineEmits<{
  (event: "remove"): void;
  (event: "update:quantity", value: number): void;
}>();
</script>
