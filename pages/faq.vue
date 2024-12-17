<template>
  <BaseMain>
    <h1 class="h1 mb-4">Häufig gestellte Fragen</h1>
    <p class="mb-8 text-lg">
      Hier findest Du die Antworten auf häufig gestellte Fragen. Sollte Deine
      Frage hier nicht beantwortet sein, schreib uns eine Nachricht über unser
      Kontaktformular.
    </p>
    <div class="mt-8">
      <dl class="divide-y divide-bg-secondary">
        <div
          v-for="faq in results"
          :key="faq._id"
          class="pt-6 pb-8 tablet:grid tablet:grid-cols-12 tablet:gap-8"
        >
          <dt class="text-base font-bold tablet:col-span-5">
            {{ faq.question }}
          </dt>
          <dd class="mt-2 tablet:col-span-7 tablet:mt-0">
            <p class="whitespace-pre-wrap text-base text-contrast-secondary">
              {{ faq.answer }}
            </p>
          </dd>
        </div>
      </dl>
    </div>
  </BaseMain>
</template>

<script setup lang="ts">
import { useHead } from "@vueuse/head";
import BaseMain from "@/components/base/BaseMain/BaseMain.vue";
import { useJsonld } from "~~/composables/useJsonld";

const { results } = await useApiData<Record<string, string>[]>("/faq");

useJsonld(() => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: results.value.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
}));

useHead({
  title: "Häufig gestellte Fragen",
});
</script>
