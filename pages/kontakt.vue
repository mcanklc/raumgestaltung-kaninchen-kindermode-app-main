<template>
  <BaseMain>
    <h1 class="h1 mb-4 text-center">Kontaktiere uns</h1>
    <p class="mb-8 text-center text-lg">
      Du hast eine Frage oder möchtest uns Feedback geben? Wir freuen uns auf
      jede Nachricht von dir! Nutze einfach eine der folgenden
      Kontaktmöglichkeiten:
    </p>
    <div
      class="mt-10 flex flex-col gap-8 tablet:flex-row tablet:justify-center"
    >
      <div
        v-for="contact in contactOptions"
        :key="contact.title"
        class="rounded-lg border p-4 text-center"
      >
        <h3 class="text-lg font-medium text-gray-900">{{ contact.title }}</h3>
        <p class="mt-2 text-base text-gray-500">
          <a :href="contact.href">{{ contact.hrefTitle }}</a>
        </p>
      </div>
    </div>
  </BaseMain>
</template>

<script setup lang="ts">
const contactOptions = [
  {
    title: "E-Mail",
    href: "mailto:mail@kaninchen-kindermode.de",
    hrefTitle: "mail@kaninchen-kindermode.de",
  },
  {
    title: "Telefon",
    href: "tel:+4915678423592",
    hrefTitle: "+49 156 / 78 42 35 92",
  },
  {
    title: "WhatsApp",
    href: "https://wa.me/4915678423592",
    hrefTitle: "Nachricht schreiben",
  },
];

useHead({
  title: "Kontakt",
});
</script>
