export default async () => {
  return await $fetch("/sitemap-routes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
