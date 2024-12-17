<template>
  <component
    :is="type === 'submit' ? 'button' : type"
    v-if="type !== 'link'"
    class="font-display inline-block rounded px-4 py-2 no-underline transition-colors"
    :class="[getColorClasses, getSizeClasses, { 'block w-full': block }]"
  >
    <slot>{{ title }}</slot>
  </component>
  <NuxtLink
    v-else
    class="font-display inline-block rounded px-4 py-2 no-underline transition-colors"
    :class="[getColorClasses, getSizeClasses, { 'block w-full': block }]"
  >
    <slot>{{ title }}</slot>
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    type?: string;
    title?: string;
    color?: "primary" | "basket";
    size?: "small" | "normal";
    block?: boolean;
  }>(),
  {
    type: "button",
    title: "",
    color: "primary",
    size: "normal",
    block: false,
  }
);

const getColorClasses = computed(() => {
  switch (props.color) {
    case "basket":
      return "bg-ci-basket hover:bg-ci-basket-hover focus:bg-ci-basket-hover active:bg-ci-basket-active text-ci-basket-contrast";
  }

  return "text-ci-primary-contrast bg-ci-primary hover:bg-ci-primary-hover focus:bg-ci-primary-hover active:bg-ci-primary-active";
});

const getSizeClasses = computed(() => {
  switch (props.size) {
    case "small":
      return "text-sm font-normal";
  }

  return "text-xl font-bold";
});
</script>
