<template>
  <div>
    <h1 class="h1 mb-4 block border-b pb-4">{{ title }}</h1>
    <slot />
    <slot name="amount">
      <UiInputAmount
        class="mb-4"
        show-label
        :model-value="amount"
        @update:model-value="emit('update:amount', $event)"
      >
        <template #amount-note>
          <slot name="amount-note" />
        </template>
      </UiInputAmount>
    </slot>
    <p class="flex items-baseline justify-between">
      <span>Preis zzgl. Versand:</span>
      <span class="font-display text-2xl font-bold">
        <span v-if="isSale && priceSale" class="mr-2 text-red-500">
          {{ priceSale }}
        </span>
        <span :class="isSale && priceSale ? 'line-through' : ''">
          {{ price }}
        </span>
      </span>
    </p>
    <p class="text-xs text-gray-500">
      Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.<br />
      <NuxtLink
        to="/versand"
        class="underline hover:no-underline focus:no-underline"
      >
        Versandkosten
      </NuxtLink>
    </p>
    <p v-if="error" class="mt-8 text-red-500">{{ error }}</p>
    <button
      type="button"
      class="bg-ci-basket font-display text-ci-basket-contrast hover:bg-ci-basket-hover focus:bg-ci-basket-hover active:bg-ci-basket-active my-8 block w-full rounded-lg p-4 text-2xl font-bold transition-colors"
      @click="emit('addToBasket')"
    >
      In den Warenkorb
    </button>
    <details v-if="description || $slots.description" open>
      <summary>Beschreibung</summary>
      <slot name="description">
        <p class="whitespace-pre-wrap">{{ description }}</p>
      </slot>
    </details>
    <details>
      <summary>Versandinformationen</summary>
      <slot name="shipping">
        <p><strong>Lieferzeit:</strong> 10 Tage</p>
        <p>
          Die angegebene Lieferzeit gilt für Lieferungen nach Deutschland.
          Lieferzeiten für andere Länder und Informationen zur Berechnung des
          Liefertermins siehe
          <NuxtLink to="/versand">Versandinformationen</NuxtLink>.
        </p>
      </slot>
    </details>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string;
    description?: string;
    amount?: number;
    price: number;
    priceSale?: number;
    isSale?: boolean;
    error?: string;
  }>(),
  {
    amount: 1,
    description: "",
    price: 0,
    priceSale: 0,
    isSale: false,
    error: undefined,
  }
);

const emit = defineEmits<{
  (e: "update:amount", v: number): void;
  (e: "addToBasket"): void;
}>();

const price = computed(() => {
  return usePriceFilter(props.price);
});

const priceSale = computed(() => {
  return usePriceFilter(props.priceSale);
});
</script>
