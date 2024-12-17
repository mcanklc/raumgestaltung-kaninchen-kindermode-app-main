<template>
  <TransitionRoot as="template" :show="showBasket">
    <Dialog
      as="div"
      class="relative z-50"
      @close="
        showBasket = false;
        showBasketAddedBanner = false;
      "
    >
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="tablet:fixed tablet:inset-0 tablet:block tablet:bg-gray-500/75 tablet:transition-opacity hidden"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="tablet:items-center tablet:px-6 desktop:px-8 flex min-h-full items-stretch justify-center text-center"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 scale-105"
            enter-to="opacity-100 scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-105"
          >
            <DialogPanel
              class="tablet:my-8 tablet:max-h-[80vh] tablet:overflow-y-scroll flex max-h-screen w-full max-w-3xl text-left text-base transition"
            >
              <div
                class="tablet:rounded-lg tablet:pb-6 desktop:py-8 relative flex w-full flex-col overflow-hidden bg-white pb-8 pt-6"
              >
                <UiAlertBanner
                  v-if="showBasketAddedBanner"
                  message="Warenkorb wurde aktualisiert"
                  class="desktop:-mt-8 -mt-6 mb-4"
                  @close="showBasketAddedBanner = false"
                />
                <div
                  class="tablet:px-6 desktop:px-8 flex shrink-0 items-center justify-between px-4"
                >
                  <h2 class="h2">Warenkorb</h2>
                  <button
                    type="button"
                    class="text-gray-400 hover:text-gray-500"
                    @click="
                      showBasket = false;
                      showBasketAddedBanner = false;
                    "
                  >
                    <span class="sr-only">Close</span>
                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <section
                  aria-labelledby="cart-heading"
                  class="min-h-0 flex-1 overflow-scroll"
                >
                  <h2 id="cart-heading" class="sr-only">
                    Artikel in deinem Warenkorb
                  </h2>

                  <ul
                    v-if="basketItems.length"
                    role="list"
                    class="tablet:px-6 desktop:px-8 divide-y divide-gray-200 px-4"
                  >
                    <UiBasketItem
                      v-for="item in basketItems"
                      :key="item.itemId"
                      v-bind="item"
                      @remove="checkoutStore.removeBasketItem(item.itemId)"
                      @update:quantity="
                        checkoutStore.updateItemQuantity(item.itemId, $event)
                      "
                    />
                  </ul>
                  <div
                    v-else
                    class="tablet:mx-6 desktop:mx-8 m-4 rounded-lg border-2 border-dashed p-4 text-center"
                  >
                    <p class="h4 mb-4">
                      Du hast noch keine Produkte zum Warenkorb hinzugefügt.
                    </p>
                    <p class="mb-8">
                      Gestalte spielend leicht Deine eigene Kinderkleidung mit
                      unserem Konfigurator.
                    </p>
                    <UiButton
                      type="link"
                      to="/selbst-gestalten"
                      @click="
                        showBasket = false;
                        showBasketAddedBanner = false;
                      "
                    >
                      Jetzt selbst gestalten
                    </UiButton>
                  </div>
                </section>

                <section
                  aria-labelledby="summary-heading"
                  class="tablet:px-6 desktop:px-8 mt-auto"
                >
                  <div class="tablet:rounded-lg tablet:p-8 bg-gray-50 p-6">
                    <h2 id="summary-heading" class="sr-only">
                      Zusammenfassung
                    </h2>
                    <div class="flow-root">
                      <dl class="-my-4 divide-y divide-gray-200 text-sm">
                        <div class="flex items-center justify-between py-4">
                          <dt class="text-base font-medium text-gray-900">
                            Gesamt
                          </dt>
                          <dd class="text-base font-medium text-gray-900">
                            {{ usePriceFilter(basketTotal) }}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </section>
                <div
                  v-if="basketItems.length"
                  class="tablet:px-6 desktop:px-8 mt-8 flex justify-end px-4"
                >
                  <UiButton
                    type="link"
                    color="basket"
                    to="/kasse"
                    @click="
                      showBasket = false;
                      showBasketAddedBanner = false;
                    "
                  >
                    Zur Kasse
                  </UiButton>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { storeToRefs } from "pinia";
import { useCheckoutStore } from "~~/store/checkout";

const checkoutStore = useCheckoutStore();
const {
  showBasket,
  showBasketAddedBanner,
  basketItems,
  basketTotal,
  basketTax,
} = storeToRefs(checkoutStore);
</script>
