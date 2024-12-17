<template>
  <div>
    <div
      class="fixed inset-0 z-10 bg-black/25 opacity-0 transition-opacity"
      aria-hidden="true"
      @click="
        resetFilters();
        emit('close');
      "
    />
    <div
      class="absolute z-40 -translate-x-1/2 -translate-y-1/2"
      :style="{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
      }"
    >
      <button
        type="button"
        class="bg-ci-primary hover:bg-ci-primary-hover focus:bg-ci-primary-hover active:bg-ci-primary-active relative z-20 flex h-12 w-12 items-center justify-center rounded-full"
        @click="
          resetFilters();
          emit('close');
        "
      >
        <XMarkIcon class="text-ci-primary-contrast h-6 w-6" />
      </button>
      <span
        aria-hidden="true"
        class="bg-bg-primary absolute -top-2 left-1/2 z-0 block h-16 w-16 -translate-x-1/2 rounded-t-full shadow-lg"
      />
      <div
        class="bg-bg-primary absolute left-1/2 top-6 z-10 w-80 max-w-[80vw] -translate-x-1/2 rounded-lg p-4 shadow-lg"
      >
        <div class="mb-4 flex items-center justify-between">
          <strong class="font-display block font-normal">
            {{ title }}
          </strong>
          <button
            type="button"
            class="bg-bg-secondary relative flex gap-4 overflow-hidden rounded p-2"
            title="Ansicht wechseln"
            @click="listView = !listView"
          >
            <span
              class="bg-bg-tertiary absolute left-0 top-0 z-0 block h-full w-1/2 transition-transform"
              :class="{ 'translate-x-full': !listView }"
            />
            <Bars4Icon class="relative z-10 h-5 w-5" />
            <Squares2X2Icon class="relative z-10 h-5 w-5" />
          </button>
        </div>
        <div class="relative">
          <ul
            class="relative grid h-56 max-h-[80vh] grid-cols-4 gap-1 overflow-y-scroll"
            :class="{ '!grid-cols-1 !gap-2': listView }"
          >
            <li
              v-for="fabric in filteredFabrics"
              :key="fabric._id"
              class="text-[0px]"
              :class="{
                'flex items-center gap-4 border-b border-bg-tertiary pb-2':
                  listView,
              }"
            >
              <button
                type="button"
                :style="
                  fabric.pattern.type === 'color'
                    ? `background-color: ${fabric.pattern.color}`
                    : `background-image: url('${fabric.preview}')`
                "
                class="border-bg-tertiary hover:border-ci-primary aspect-square w-full rounded-full border-2 bg-cover bg-center transition-colors"
                :class="{ '!w-16 !shrink-0': listView }"
                @click="
                  resetFilters();
                  emit('select', fabric);
                "
              />
              <p
                v-if="listView"
                class="font-display block text-base font-normal"
              >
                {{ fabric.title }}
              </p>
            </li>
          </ul>
          <div
            v-if="showFilters"
            class="absolute top-0 left-0 h-full w-full bg-white"
          >
            <FormKit
              v-model="fabricCategoryOption"
              type="select"
              label="Kategorie"
              :options="fabricCategoryOptions"
            />
            <FormKit
              v-model="fabricMaterialOption"
              type="select"
              label="Material"
              :options="fabricMaterialOptions"
            />
            <FormKit
              v-model="seasonOption"
              type="select"
              label="Saison"
              :options="seasonOptions"
            />
          </div>
        </div>
        <UiButton
          type="button"
          size="small"
          block
          class="mt-4"
          @click="showFilters = !showFilters"
        >
          <template v-if="showFilters">
            {{ filteredFabrics.length }} Ergebnisse anzeigen
          </template>
          <template v-else> Stoffe Filtern </template>
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { XMarkIcon, Bars4Icon, Squares2X2Icon } from "@heroicons/vue/20/solid";
import { storeToRefs } from "pinia";
import { useMetaStore } from "~~/store/meta";

const props = withDefaults(
  defineProps<{
    title: string;
    type: string;
    fabrics: API.Kaninchen.Fabric[];
    pos?: { x: number; y: number };
  }>(),
  {
    pos: () => ({ x: 0, y: 0 }),
  }
);

const emit = defineEmits<{
  (e: "close"): void;
  (e: "select", fabric: API.Kaninchen.Fabric): void;
}>();

const metaStore = useMetaStore();
const { filterByFabricCategories, filterByFabricMaterials, filterBySeasons } =
  storeToRefs(metaStore);

const fabricCategoryOptions = computed(() => {
  const options = [{ value: "", label: "Alle" }];
  filterByFabricCategories.value.options.map((category) =>
    options.push(category)
  );
  return options;
});

const fabricMaterialOptions = computed(() => {
  const options = [{ value: "", label: "Alle" }];
  filterByFabricMaterials.value.options.map((category) =>
    options.push(category)
  );
  return options;
});

const seasonOptions = computed(() => {
  const options = [{ value: "", label: "Alle" }];
  filterBySeasons.value.options.map((category) => options.push(category));
  return options;
});

const showFilters = ref(false);
const fabricCategoryOption = ref("");
const fabricMaterialOption = ref("");
const seasonOption = ref("");

const filteredFabrics = computed(() => {
  return props.fabrics
    .filter((fabric) => {
      return fabric.type === props.type;
    })
    .filter((fabric) => {
      return fabricCategoryOption.value === ""
        ? true
        : fabric.categories.includes(fabricCategoryOption.value);
    })
    .filter((fabric) => {
      return fabricMaterialOption.value === ""
        ? true
        : fabricMaterialOption.value === fabric.material;
    })
    .filter((fabric) => {
      return seasonOption.value === ""
        ? true
        : fabric.season.includes(seasonOption.value);
    })
    .sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
});

const listView = ref(false);

const resetFilters = () => {
  fabricCategoryOption.value = "";
  fabricMaterialOption.value = "";
  seasonOption.value = "";
};
</script>
