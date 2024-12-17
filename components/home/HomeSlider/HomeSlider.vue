<template>
  <div ref="sliderRef" class="container relative">
    <div class="relative min-h-[400px] overflow-hidden rounded-b-lg">
      <article
        v-for="item in items"
        :key="item.id"
        class="absolute inset-0 transition-opacity duration-1000"
        :class="
          activeSliderItem === item.id ? 'opacity-100 z-20' : 'opacity-0 z-10'
        "
      >
        <img
          :src="item.image.src"
          :alt="item.image.alt"
          class="absolute h-full w-full object-cover"
        />
        <div
          class="relative z-20 h-full bg-gradient-to-r from-black/75 to-black/0"
        >
          <div class="container flex h-full items-center justify-start p-0">
            <div class="p-8 text-left text-white">
              <h1 class="font-display mb-4 text-5xl">{{ item.title }}</h1>
              <p class="mx-auto mb-8 max-w-lg">{{ item.teaser }}</p>
              <UiButton
                v-if="item.cta"
                type="button"
                :title="item.cta.title"
                @click="$router.push(item.cta.href)"
              />
            </div>
          </div>
        </div>
      </article>
      <ul
        class="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center justify-center"
      >
        <li>
          <button class="block" @click="changeSliderItem('prev')">
            <span class="icon text-bg-primary block">chevron_left</span>
          </button>
        </li>
        <li v-for="(item, index) in items" :key="item.id" class="px-2">
          <button
            class="block h-1 w-8 rounded"
            :class="
              activeSliderItem === item.id
                ? 'bg-bg-primary'
                : 'bg-bg-primary/25'
            "
            @click="changeSliderItem(index)"
          ></button>
        </li>
        <li>
          <button class="block" @click="changeSliderItem('next')">
            <span class="icon text-bg-primary block">chevron_right</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSwipe, useIntersectionObserver } from "@vueuse/core";
import { computed, ref } from "vue";
import UiButton from "../../ui/UiButton/UiButton.vue";
import { useConfigStore } from "@/store/config";

const configStore = useConfigStore();
const autoplay = computed(() => configStore.remoteConfig.home.slider.autoplay);
const autoplaySpeed = computed(
  () => configStore.remoteConfig.home.slider.autoplaySpeed
);
const items = computed(() =>
  configStore.remoteConfig.home.slider.items.map((item, index) => ({
    id: `slider-item-${index}`,
    ...item,
  }))
);

/**
 * Enable touch events for swiping navigation.
 */
const sliderRef = ref(null);
useSwipe(sliderRef, {
  onSwipeEnd: (_e, direction) => {
    if (direction === "LEFT") {
      changeSliderItem("next");
    } else if (direction === "RIGHT") {
      changeSliderItem("prev");
    }
  },
});

let autoSlideInterval: any = null;
useIntersectionObserver(sliderRef, ([{ isIntersecting }]) => {
  if (isIntersecting && autoplay.value) {
    autoSlideInterval = setInterval(
      () => changeSliderItem("next"),
      autoplaySpeed.value
    );
  } else {
    clearTimeout(autoSlideInterval);
  }
});

const activeSliderItem = ref("slider-item-0");

const changeSliderItem = (index: number | "prev" | "next") => {
  if (index === "prev") {
    const prevIndex = items.value.findIndex(
      (item) => item.id === activeSliderItem.value
    );
    activeSliderItem.value =
      prevIndex <= 0
        ? items.value[items.value.length - 1].id
        : items.value[prevIndex - 1].id;
  } else if (index === "next") {
    const nextIndex = items.value.findIndex(
      (item) => item.id === activeSliderItem.value
    );
    activeSliderItem.value =
      nextIndex >= items.value.length - 1
        ? items.value[0].id
        : items.value[nextIndex + 1].id;
  } else {
    activeSliderItem.value = items.value[index].id;
  }
};
</script>
