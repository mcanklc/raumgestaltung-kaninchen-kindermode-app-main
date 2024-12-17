import { useConfigStore } from "@/store/config";

export default defineNuxtRouteMiddleware(async () => {
  const configStore = useConfigStore();

  // Fetch remote config if not fetched yet
  if (!configStore.remoteConfigFetched) {
    await configStore.fetchRemoteConfig();
  }
});
