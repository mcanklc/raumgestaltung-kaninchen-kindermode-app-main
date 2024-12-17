<template>
  <div class="text-left">
    <strong v-if="showLabel" class="mb-2 inline-block font-display font-normal"
      >Menge:</strong
    >
    <div class="flex items-center gap-2">
      <button
        type="button"
        class="flex h-10 w-10 items-center justify-center rounded border"
        @click="updateAmount('minus')"
      >
        <MinusIcon class="h-4 w-4" />
      </button>
      <span class="flex h-10 w-10 items-center justify-center rounded border">
        {{ modelValue }}
      </span>
      <button
        type="button"
        class="flex h-10 w-10 items-center justify-center rounded border"
        @click="updateAmount('plus')"
      >
        <PlusIcon class="h-4 w-4" />
      </button>
      <slot name="amount-note">{{ note || "Stück" }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlusIcon, MinusIcon } from "@heroicons/vue/20/solid";

const props = withDefaults(
  defineProps<{
    modelValue: number;
    showLabel?: boolean;
    note?: string;
  }>(),
  {
    showLabel: false,
    note: undefined,
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

const updateAmount = (type: "plus" | "minus") => {
  if (type === "plus") {
    emit("update:modelValue", props.modelValue + 1);
  } else {
    emit(
      "update:modelValue",
      props.modelValue - 1 > 0 ? props.modelValue - 1 : 1
    );
  }
};
</script>
