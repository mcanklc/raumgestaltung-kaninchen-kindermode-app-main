<template>
  <div class="rounded-md bg-green-50 p-4">
    <div class="flex">
      <div class="shrink-0">
        <CheckCircleIcon class="h-5 w-5 text-green-400" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <p class="text-sm font-medium text-green-800">{{ message }}</p>
      </div>
      <div class="ml-auto pl-3">
        <div class="-m-1.5">
          <button
            type="button"
            class="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
            @click="emit('close')"
          >
            <span class="sr-only">Schließen</span>
            <XMarkIcon class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { XMarkIcon, CheckCircleIcon } from "@heroicons/vue/20/solid";

defineProps<{
  message: string;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();
</script>
