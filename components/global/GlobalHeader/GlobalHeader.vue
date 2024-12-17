<template>
  <header ref="headerRef" class="bg-bg-primary w-full">
    <div
      class="bg-bg-primary tablet:pb-0 relative"
      :class="{ 'pb-[calc(42px+1rem)]': showSearchOnMobile }"
    >
      <div class="container flex items-center justify-between pt-4">
        <RouterLink to="/" class="text-white" title="Startseite">
          <img
            src="/assets/logotype.svg"
            alt="Kaninchen Kindermode - Logo"
            height="96"
            width="192"
            class="tablet:h-24 h-16 w-auto"
          />
        </RouterLink>
        <div class="flex items-center gap-2">
          <form
            class="tablet:relative tablet:inset-x-auto tablet:bottom-auto tablet:min-w-[320px] tablet:block absolute inset-x-4 bottom-0 z-40 hidden"
            :class="{ '!block': showSearchOnMobile }"
            @submit.prevent="handleSearchSubmit"
          >
            <input
              type="search"
              name="search"
              placeholder="Durchsuche unseren Shop"
              class="bg-bg-secondary focus:border-ci-primary focus:ring-ci-primary w-full appearance-none rounded-md border-transparent pr-10 shadow-sm"
            />
            <button
              type="submit"
              class="text-ci-contrast hover:bg-bg-tertiary absolute right-0 top-1/2 -translate-y-1/2 rounded p-2 transition-colors"
            >
              <span class="icon block">search</span>
            </button>
          </form>
          <button
            type="button"
            class="text-ci-contrast hover:bg-bg-tertiary tablet:hidden relative rounded p-2 transition-colors"
            @click="showSearchOnMobile = !showSearchOnMobile"
          >
            <span class="icon block">search</span>
          </button>
          <button
            type="button"
            class="text-ci-contrast hover:bg-ci-basket relative rounded p-2 transition-colors"
            @click="showBasket = true"
          >
            <span class="icon block">shopping_bag</span>
            <span
              v-if="numberOfBasketItems"
              class="bg-ci-basket absolute bottom-0 right-0 h-4 min-w-[16px] rounded-full p-0.5 px-1 text-center text-xs leading-none"
            >
              {{ numberOfBasketItems }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </header>
  <div
    ref="mainNavigationRef"
    class="bg-bg-primary sticky left-0 top-0 z-30 w-full shadow-lg"
  >
    <div class="container relative">
      <nav class="-mx-4 overflow-hidden">
        <span
          aria-hidden="true"
          class="from-bg-primary absolute inset-y-0 left-0 w-4 bg-gradient-to-r"
        />
        <ul
          ref="navigation"
          class="font-display -mb-16 overflow-x-scroll whitespace-nowrap px-2 pb-16 text-xl"
          @scroll="onNavigationScroll"
        >
          <MainNavigationItem
            v-for="link in mainNavigationLinks"
            :key="link.title"
            v-bind="link"
          />
        </ul>
        <span
          aria-hidden="true"
          class="from-bg-primary pointer-events-none absolute inset-y-0 right-0 bg-gradient-to-l transition-all"
          :class="navigationIsScrolled ? 'w-4' : 'w-12'"
        />
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, onUnmounted, ref } from "vue";
import MainNavigationItem from "./parts/MainNavigationItem.vue";
import { useAppStore } from "@/store/app";
import { useConfigStore } from "@/store/config";
import { useCheckoutStore } from "~~/store/checkout";

const appStore = useAppStore();
const configStore = useConfigStore();
const checkoutStore = useCheckoutStore();
const router = useRouter();

const { showBasket } = storeToRefs(checkoutStore);

const navigationIsScrolled = ref(false);

const headerRef = ref<HTMLElement | null>(null);
const mainNavigationRef = ref<HTMLElement | null>(null);
const showSearchOnMobile = ref(false);

const onNavigationScroll = (e: Event) => {
  if ((e.target as HTMLElement).scrollLeft > 0) {
    navigationIsScrolled.value = true;
  } else {
    navigationIsScrolled.value = false;
  }
};

const setHeaderMinimizedTransform = () => {
  const headerHeight = headerRef.value?.clientHeight || 0;
  const mainNavigationHeight = mainNavigationRef.value?.clientHeight || 0;
  appStore.$patch({
    headerHeight,
    mainNavigationHeight,
  });
};

const mainNavigationLinks = configStore.remoteConfig?.navigation?.main;

const numberOfBasketItems = computed(() => checkoutStore.numberOfBasketItems);

const handleSearchSubmit = (e: Event) => {
  const data = new FormData(e.target as HTMLFormElement);
  const search = data.get("search");
  router.push({ path: "/suche", query: { q: search } });
};

onMounted(() => {
  setHeaderMinimizedTransform();
  window.addEventListener("resize", setHeaderMinimizedTransform);
});

onUnmounted(() => {
  window.removeEventListener("resize", setHeaderMinimizedTransform);
});
</script>
