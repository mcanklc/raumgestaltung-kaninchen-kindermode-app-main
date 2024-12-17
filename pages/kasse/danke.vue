<template>
  <BaseMain>
    <UiIntro
      title="Danke für Deine Bestellung!"
      intro="Du erhältst in Kürze eine E-Mail mit Deiner Bestellbestätigung."
      center
    />
  </BaseMain>
</template>

<script setup lang="ts">
import { useCheckoutStore } from "~~/store/checkout";

const checkoutStore = useCheckoutStore();
const route = useRoute();
const router = useRouter();

onMounted(async () => {
  checkoutStore.clearBasket();

  await $fetch(`${useRuntimeConfig().public.apiUrl}/orders/process`, {
    method: "POST",
    body: {
      orderId: route.query.orderId,
      paypalOrderId: route.query.token || undefined,
    },
  });

  setTimeout(() => {
    router.push("/");
  }, 10000);
});

useHead({
  title: "Danke für Deine Bestellung!",
});
</script>
