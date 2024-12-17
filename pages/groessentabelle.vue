<template>
  <BaseMain>
    <UiIntro
      title="Größentabelle"
      intro="Hier findest du eine kleine Orientierungshilfe zur Größe unserer Kleidungsstücke. Bitte beachte, dass diese Übersicht nur der Orientierung dient, insbesondere in Bezug auf das Alter."
    />
    <form class="relative mb-8 w-full" action="#">
      <input
        v-model="search"
        type="search"
        placeholder="Durchsuche unsere Größentabelle"
        class="bg-bg-secondary focus:border-ci-primary focus:ring-ci-primary w-full appearance-none rounded-md border-transparent pr-10 shadow-sm"
      />
      <button
        type="submit"
        class="text-ci-contrast hover:bg-bg-tertiary absolute right-0 top-1/2 -translate-y-1/2 rounded p-2 transition-colors"
      >
        <span class="icon block">search</span>
      </button>
    </form>
    <div>
      <div v-for="result in filteredResults" :key="result._id" class="mb-8">
        <h2 class="h2 mb-4">{{ result.product.title }}</h2>
        <div class="tablet:flex mb-4">
          <div class="tablet:mb-0 mb-4">
            <figure
              class="bg-ci-secondary tablet:w-48 relative aspect-[3/4] w-full overflow-hidden rounded"
            >
              <div class="vector" v-html="result.product.illustration" />
            </figure>
          </div>
          <div class="tablet:ml-8">
            <table class="tablet:mb-0 mb-4 w-full table-fixed">
              <thead>
                <tr>
                  <th class="px-4 py-2 text-sm">Größe</th>
                  <th class="px-4 py-2 text-sm">Umfang</th>
                  <th class="px-4 py-2 text-sm">Länge</th>
                  <th class="px-4 py-2 text-sm">Körpergröße</th>
                  <th class="tablet:table-cell hidden px-4 py-2 text-sm">
                    Bemerkungen
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(size, index) in result.sizes"
                  :key="size.id"
                  :class="{ 'bg-grey': index % 2 !== 0 }"
                >
                  <td class="border-grey border px-4 py-2 text-center text-xs">
                    {{ size.title }}
                  </td>
                  <td class="border-grey border px-4 py-2 text-center text-xs">
                    {{ size.circumference }}
                  </td>
                  <td class="border-grey border px-4 py-2 text-center text-xs">
                    {{ size.length }}
                  </td>
                  <td class="border-grey border px-4 py-2 text-center text-xs">
                    {{ size.height }}
                  </td>
                  <td
                    class="border-grey tablet:table-cell hidden border px-4 py-2 text-center text-xs"
                  >
                    {{ size.notes }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <template v-if="result.notes">
          <h3 class="h3">Hinweise</h3>
          <p>{{ result.notes }}</p>
        </template>
      </div>
      <p>
        Du benötigst Hilfe bei der Auswahl der richtigen Größe? Schreib uns
        einfach eine Nachricht, und wir werden unser bestes tun, Dir
        weiterzuhelfen:
        <NuxtLink to="/kontakt">Zu unserem Kontaktformular.</NuxtLink>
      </p>
    </div>
  </BaseMain>
</template>

<script setup lang="ts">
const { results } = await useApiData("/sizechart", {
  params: { limit: "1000" },
});

const search = ref("");

const filteredResults = computed(() => {
  return results.value.filter((result) =>
    result.product.title.toLowerCase().includes(search.value.toLowerCase())
  );
});

useHead({
  title: "Größentabelle",
});
</script>

<style scoped>
.vector {
  @apply flex h-full w-full items-center justify-center p-8;
}

.vector:deep(svg) {
  @apply h-auto w-full max-w-full transition-transform duration-500;
}
</style>
