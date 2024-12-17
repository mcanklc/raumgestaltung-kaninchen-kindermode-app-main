import { useMetaStore } from "~~/store/meta";

export default defineNuxtRouteMiddleware(async () => {
  const metaStore = useMetaStore();

  await metaStore.fetchAll();
});
