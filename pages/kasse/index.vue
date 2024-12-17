<template>
  <BaseMain>
    <div v-if="hasError">
      <p>
        Leider ist ein Fehler aufgetreten. Bitte versuche es erneut, sollte es
        dann immer noch nicht funktionieren schreib uns bitte eine Nachricht.
      </p>
    </div>
    <UiIntro
      title="Bestellen"
      intro="Nur noch ein paar Angaben und schon bald wirst Du Deine Kinderkleidung in den Händen halten."
    />
    <FormKit v-model="data" type="form" :actions="false" @submit="handleSubmit">
      <div class="tablet:flex tablet:gap-8">
        <div class="tablet:w-1/2 tablet:shrink-0">
          <fieldset class="mb-10 border-b">
            <legend class="font-display mb-4 text-xl">
              Kontaktinformationen
            </legend>
            <FormKit
              type="email"
              label="E-Mail Adresse*"
              name="email"
              validation="required"
              @input="checkMinimumOrders"
            />
          </fieldset>
          <fieldset class="mb-10 border-b">
            <legend class="font-display mb-4 text-xl">Versandadresse</legend>
            <FormKit type="group" name="shippingAddress">
              <div class="flex items-start gap-4">
                <FormKit
                  type="text"
                  label="Vorname*"
                  name="firstname"
                  validation="required"
                />
                <FormKit
                  type="text"
                  label="Nachname*"
                  name="lastname"
                  validation="required"
                />
              </div>
              <FormKit type="text" label="Firma" name="company" />
              <FormKit
                type="text"
                label="Straße und Hausnummer*"
                name="street"
                validation="required"
              />
              <FormKit
                type="text"
                label="Stockwerk, Tür, etc."
                name="street2"
              />
              <div class="flex items-start gap-4">
                <FormKit
                  type="text"
                  label="Postleitzahl*"
                  name="zip"
                  validation="required"
                />
                <FormKit
                  type="text"
                  label="Stadt*"
                  name="city"
                  validation="required"
                />
              </div>
              <FormKit
                type="select"
                label="Land*"
                name="country"
                :options="
                  shippingCountries.map((country) => ({
                    value: country,
                    label: getCountryName(country),
                  }))
                "
                validation="required"
              />
            </FormKit>
          </fieldset>
          <fieldset class="mb-10 border-b">
            <legend class="font-display mb-4 text-xl">Rechnungsadresse</legend>
            <FormKit type="group" name="billingAddress">
              <FormKit
                type="checkbox"
                label="Rechnungsadresse ist abweichend von Versandadresse"
                name="differentFromShipping"
              />
              <template v-if="data.billingAddress.differentFromShipping">
                <div class="flex items-start gap-4">
                  <FormKit
                    type="text"
                    label="Vorname*"
                    name="firstname"
                    validation="required"
                  />
                  <FormKit
                    type="text"
                    label="Nachname*"
                    name="lastname"
                    validation="required"
                  />
                </div>
                <FormKit type="text" label="Firma" name="company" />
                <FormKit
                  type="text"
                  label="Straße und Hausnummer*"
                  name="street"
                  validation="required"
                />
                <FormKit
                  type="text"
                  label="Stockwerk, Tür, etc."
                  name="street2"
                />
                <div class="flex items-start gap-4">
                  <FormKit
                    type="text"
                    label="Postleitzahl*"
                    name="zip"
                    validation="required"
                  />
                  <FormKit
                    type="text"
                    label="Stadt*"
                    name="city"
                    validation="required"
                  />
                </div>
                <FormKit
                  type="select"
                  label="Land*"
                  name="country"
                  :options="countryOptions"
                  validation="required"
                />
              </template>
            </FormKit>
          </fieldset>
          <fieldset class="mb-10 border-b">
            <legend class="font-display mb-4 text-xl">Versand</legend>
            <FormKit
              type="radio"
              name="shippingMethod"
              :options="shippingMethodOptions"
              validation="required"
              validation-label="Versandart"
            />
          </fieldset>
          <fieldset class="mb-10 border-b">
            <legend class="font-display mb-4 text-xl">Zahlungsmethode</legend>
            <FormKit
              type="radio"
              name="billingMethod"
              :options="billingMethodOptions"
              validation="required"
              validation-label="Zahlungsmethode"
            />
          </fieldset>
          <fieldset class="mb-10 border-b">
            <legend class="font-display mb-4 text-xl">Gutschein</legend>
            <div class="flex items-start gap-4">
              <FormKit type="group" name="voucher">
                <FormKit type="text" name="code" />
                <button
                  type="button"
                  class="bg-ci-primary font-display text-ci-primary-contrast hover:bg-ci-primary-hover focus:bg-ci-primary-hover active:bg-ci-primary-active inline-block rounded px-4 py-2 no-underline transition-colors"
                  @click="applyVoucher"
                >
                  Prüfen
                </button>
              </FormKit>
            </div>
            <p v-if="voucherStatus === 'invalid'" class="mb-4 text-red-400">
              Dieser Gutschein ist leider nicht gültig.
            </p>
            <p
              v-else-if="voucherStatus === 'valid'"
              class="text-ci-basket mb-4"
            >
              Gutschein wurde eingelöst.
            </p>
          </fieldset>
          <fieldset class="mb-10 border-b">
            <legend class="font-display mb-4 text-xl">Anmerkungen</legend>
            <FormKit type="textarea" name="notes" />
          </fieldset>
          <p class="text-xs">* Pflichtfelder</p>
        </div>
        <div class="min-w-0 grow">
          <section aria-labelledby="cart-heading">
            <h2 id="cart-heading" class="sr-only">
              Artikel in deinem Warenkorb
            </h2>

            <ul
              v-if="basketItems.length"
              role="list"
              class="divide-y divide-gray-200"
            >
              <UiBasketItem
                v-for="item in basketItems"
                :key="item.itemId"
                v-bind="item"
                :edit-quantity="false"
                :remove="false"
              />
            </ul>
          </section>
          <section aria-labelledby="summary-heading" class="mb-8 w-full">
            <div class="tablet:rounded-lg tablet:p-8 bg-gray-50 p-6">
              <h2 id="summary-heading" class="sr-only">Zusammenfassung</h2>
              <div class="flow-root">
                <dl class="-my-4 divide-y divide-gray-200 text-sm">
                  <div class="flex items-center justify-between py-4">
                    <dt class="text-gray-600">Zwischensumme</dt>
                    <dd class="font-medium text-gray-900">
                      {{ usePriceFilter(basketTotal) }}
                    </dd>
                  </div>
                  <div
                    v-if="voucher"
                    class="flex items-center justify-between py-4"
                  >
                    <dt class="text-gray-600">Gutschein</dt>
                    <dd class="font-medium text-gray-900">
                      {{ usePriceFilter(voucher) }}
                    </dd>
                  </div>
                  <div class="flex items-center justify-between py-4">
                    <dt class="text-gray-600">Versandkosten</dt>
                    <dd class="font-medium text-gray-900">
                      {{ usePriceFilter(shippingTotal) }}
                    </dd>
                  </div>
                  <div class="flex items-center justify-between py-4">
                    <dt class="text-base font-medium text-gray-900">Gesamt</dt>
                    <dd class="text-base font-medium text-gray-900">
                      {{ usePriceFilter(total) }}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>
          <UiButton type="submit" color="basket" block class="text-center">
            Kostenpflichtig bestellen
          </UiButton>
        </div>
      </div>
    </FormKit>
  </BaseMain>
</template>

<script setup lang="ts">
import currency from "currency.js";
import { storeToRefs } from "pinia";
import { useCheckoutStore } from "~~/store/checkout";
import { useConfigStore } from "~~/store/config";

const configStore = useConfigStore();
const { shippingCountries, shippingMethods, billingMethods } =
  storeToRefs(configStore);
const { getCountryName, countryOptions } = useCountryCode();
const checkoutStore = useCheckoutStore();
const { basketTotal, basketTax, basketItems } = storeToRefs(checkoutStore);
const router = useRouter();

const data = ref({
  email: "",
  shippingAddress: {
    firstname: "",
    lastname: "",
    company: "",
    street: "",
    street2: "",
    zip: "",
    city: "",
    country: "de",
  },
  billingAddress: {
    differentFromShipping: false,
    firstname: "",
    lastname: "",
    company: "",
    street: "",
    street2: "",
    zip: "",
    city: "",
    country: "de",
  },
  voucher: {
    type: "discount",
    code: "",
    discount: 0,
  },
  shippingMethod: "dhl",
  billingMethod: "banktransfer",
  notes: "",
});

const shippingMethodOptions = computed(() => {
  const options: any[] = [];

  shippingMethods.value.forEach((method) => {
    if (
      Object.keys(method.price).includes(data.value.shippingAddress.country)
    ) {
      options.push({
        value: method.id,
        label: `${method.title} (${usePriceFilter(
          method.price[data.value.shippingAddress.country]
        )})`,
      });
    }
  });

  return options;
});

const hasMinimumOrders = ref(false);

const checkMinimumOrders = async () => {
  const config = useRuntimeConfig();
  const response = await fetch(
    `${config.public.apiUrl}/orders/validate-minimum-orders`,
    {
      method: "POST",
      body: JSON.stringify({
        email: data.value.email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status === 200) hasMinimumOrders.value = true;
};

const billingMethodOptions = computed(() => {
  const verifyBillingConditions = (condition?: {
    shippingMethod?: string[];
    billingCountry?: string[];
    minimumOrders?: number;
  }): boolean => {
    if (!condition) return true;
    if (
      condition.shippingMethod &&
      !condition.shippingMethod.includes(data.value.shippingMethod)
    ) {
      return false;
    }

    if (
      condition.billingCountry &&
      !condition.billingCountry.includes(
        data.value.billingAddress.differentFromShipping
          ? data.value.billingAddress.country
          : data.value.shippingAddress.country
      )
    ) {
      return false;
    }

    if (
      condition.minimumOrders !== undefined &&
      condition.minimumOrders > 0 &&
      !hasMinimumOrders.value
    ) {
      return false;
    }

    return true;
  };

  const options: any[] = [];

  billingMethods.value.forEach((method) => {
    if (verifyBillingConditions(method.condition)) {
      options.push({
        value: method.id,
        label: method.title,
      });
    }
  });

  return options;
});

const shippingTotal = computed(() => {
  const method = shippingMethods.value.find(
    (method) => method.id === data.value.shippingMethod
  );

  if (method) {
    return method.price[data.value.shippingAddress.country];
  }

  return 0;
});

const voucher = computed(() => {
  if (data.value.voucher.code && voucherStatus.value === "valid") {
    if (data.value.voucher.type === "voucher") {
      return data.value.voucher.discount * -1;
    } else {
      return (
        currency(basketTotal.value).multiply(data.value.voucher.discount / 100)
          .value * -1
      );
    }
  }

  return undefined;
});

const total = computed(() => {
  if (voucher.value) {
    const result = currency(basketTotal.value)
      .subtract(voucher.value * -1)
      .add(shippingTotal.value).value;

    return result > 0 ? result : 0;
  }
  return currency(basketTotal.value).add(shippingTotal.value).value;
});

const applyVoucher = async () => {
  voucherStatus.value = "idle";
  try {
    const res = await $fetch<any>(
      `${useRuntimeConfig().public.apiUrl}/vouchers/validate/${
        data.value.voucher.code
      }`
    );
    data.value.voucher.type = res.type;
    data.value.voucher.discount = res.value;
    voucherStatus.value = "valid";
  } catch (error) {
    voucherStatus.value = "invalid";
  }
};

const hasError = ref(false);
const voucherStatus = ref<"idle" | "valid" | "invalid">("idle");

const handleSubmit = async (data: Record<string, any>) => {
  hasError.value = false;
  try {
    const res = await $fetch<any>(
      `${useRuntimeConfig().public.apiUrl}/orders/submit`,
      {
        method: "POST",
        body: {
          items: basketItems.value,
          shippingAddress: data.shippingAddress,
          billingAddress: data.billingAddress.differentFromShipping
            ? data.billingAddress
            : data.shippingAddress,
          email: data.email,
          shippingMethod: data.shippingMethod,
          billingMethod: data.billingMethod,
          voucher: {
            code: data.voucher.code,
            type: data.voucher.type,
            discount: voucher.value,
          },
          price: {
            subtotal: basketTotal.value,
            shipping: shippingTotal.value,
            total: total.value,
          },
          returnUrl: `${window.location.origin}/kasse/danke`,
          cancelUrl: `${window.location.origin}/kasse`,
          notes: data.notes,
        },
      }
    );

    if (res.paypal && res.paypal.url) {
      window.location.href = res.paypal.url;
    } else {
      router.push(`/kasse/danke/?orderId=${res.orderId}`);
    }
  } catch (e) {
    hasError.value = true;
  }
};

useHead({
  title: "Kasse",
});
</script>
