import { UseApiDataOptions } from "./useApiData";

export const useListApiData = async (
  endpoint: string,
  additionalParams?: Record<string, string>,
  options: UseApiDataOptions = {}
) => {
  const route = useRoute();
  const router = useRouter();
  const params = computed(() => route.query);
  const { handleNavigation } = usePagination();

  const { meta, results, refresh } = await useApiData<Record<string, any>[]>(
    endpoint,
    {
      params: computed(() => ({
        ...params.value,
        ...additionalParams,
      })),
      key: `${endpoint}-${JSON.stringify(params.value)}`,
      ...options,
    }
  );

  watch(params, async () => await refresh());

  const activeFilters = computed({
    get() {
      return params.value;
    },
    set(value) {
      router.replace({
        query: {
          ...value,
          page: 1,
        },
      });
    },
  });

  return {
    meta,
    results,
    handleNavigation,
    activeFilters,
  };
};
