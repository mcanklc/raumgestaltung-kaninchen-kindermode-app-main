<template>
  <div class="bg-bg-secondary relative aspect-square rounded-lg">
    <div
      ref="illustrationContainerRef"
      class="absolute top-0 left-0 flex h-full w-full items-center justify-center overflow-hidden"
    >
      <div
        id="illustration"
        ref="illustrationRef"
        class="p-12"
        v-html="illustration"
      />
    </div>
    <p class="absolute bottom-0 left-0 w-full p-4 text-center text-xs">
      Tippe einfach auf den Bereich den Du ändern möchtest.
    </p>
    <KaninchenEditorOption
      v-show="selectedOptionVisible"
      :title="selectedOption.title"
      :type="selectedOption.type"
      :fabrics="fabrics"
      :pos="selectedOptionPos"
      @close="selectedOptionVisible = false"
      @select="handleOptionClick"
    />
  </div>
</template>

<script setup lang="ts">
import { stringify } from "qs";

interface Option {
  _id: string;
  title: string;
  type: string;
  selector: string;
  order: number;
}

const props = defineProps<{
  productId: string;
  options: Option[];
  selectedOptions: Record<string, string | null>;
}>();

const emit = defineEmits<{
  (e: "select", optionId: string, fabricId: string): void;
  (e: "update", payload: { illustration: string; description: string }): void;
}>();

const { results: fabrics } = await useApiData<any[]>("/fabrics?sort=title", {
  key: "fabrics-editor",
  params: {
    limit: "10000",
  },
});

const getDescription = () => {
  const options = [];
  props.options.forEach((option) => {
    const selectedFabric = fabrics.value.find(
      (fabric) => fabric._id === props.selectedOptions[option._id]
    );

    options.push(
      `${option.title}: ${
        selectedFabric ? selectedFabric.title : "Keine Auswahl"
      }`
    );
  });
  return options.join(", ");
};

const illustration = ref<string | undefined>();

const illustrationContainerRef = ref<HTMLDivElement>();
const illustrationRef = ref<HTMLElement>();

const selectedOptionVisible = ref(false);
const selectedOptionPos = ref<{ x: number; y: number }>({ x: 0, y: 0 });
const selectedOption = ref<Option>({
  _id: "",
  title: "",
  type: "",
  selector: "",
  order: 0,
});

const attachEventHandlers = () => {
  const results = illustrationRef.value.querySelectorAll(
    props.options.map((o) => `.${o.selector}`).join(", ")
  );

  results.forEach((result) => {
    result.addEventListener("click", (event: PointerEvent) => {
      event.preventDefault();
      event.stopPropagation();

      const iCoPos = illustrationContainerRef.value.getBoundingClientRect();

      selectedOption.value = props.options.find(
        (o) => o.selector === result.classList[0]
      );
      selectedOptionPos.value = {
        x: event.pageX - (iCoPos.left + window.scrollX),
        y: event.pageY - (iCoPos.top + window.scrollY),
      };
      selectedOptionVisible.value = true;
    });
  });
};

const getIllustration = async () => {
  const response = await $fetch.raw<Blob>(
    `${useRuntimeConfig().public.apiUrl}/illustration?${stringify({
      productId: props.productId,
      options: props.selectedOptions,
    })}`
  );
  illustration.value = await response._data.text();
  await nextTick();
  if (!process.server) {
    attachEventHandlers();
  }
};

const handleOptionClick = (fabric: API.Kaninchen.Fabric) => {
  selectedOptionVisible.value = false;
  emit("select", selectedOption.value._id, fabric._id);
};

watch(
  () => props.selectedOptions,
  async () => {
    emit("update", {
      illustration: `${
        useRuntimeConfig().public.apiUrl
      }/illustration?${stringify({
        productId: props.productId,
        options: props.selectedOptions,
      })}`,
      description: getDescription(),
    });
    await getIllustration();
  },
  { immediate: true }
);

onMounted(async () => {
  await getIllustration();
});
</script>

<style scoped>
#illustration:deep(svg) {
  @apply max-w-full max-h-full w-[512px];
}

#illustration:deep(svg) .base,
#illustration:deep(svg) .waistband,
#illustration:deep(svg) .inlet,
#illustration:deep(svg) .button,
#illustration:deep(svg) .hood,
#illustration:deep(svg) .sleeve,
#illustration:deep(svg) .pocket {
  @apply transition-all cursor-pointer hover:stroke-ci-primary;
}
</style>
