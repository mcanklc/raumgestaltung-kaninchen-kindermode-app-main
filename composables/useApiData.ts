import merge from "lodash.merge";
import { Ref } from "vue";

export interface ApiMeta {
  totalResults: number;
  totalPages: number;
  currentPage: number;
  prevPage: number;
  nextPage: number;
}

export interface UseApiDataParams {
  [key: string]: any;
  page?: string | Ref<string>;
  limit?: string | Ref<string>;
  sort?: string | Ref<string>;
}

export interface UseApiDataOptions {
  key?: string;
  params?: UseApiDataParams | Ref<UseApiDataParams>;
}

export const useApiData = async <ResultsT = Record<string, any>>(
  endpoint: string,
  options: UseApiDataOptions = {}
) => {
  const runtimeConfig = useRuntimeConfig();
  options = merge({ params: { page: "1", limit: "24" } }, options);

  const queryParams = computed(() => {
    const params = options.params;
    let queryParams = {};

    if (isRef(params)) {
      queryParams = params.value;
    } else {
      queryParams = {
        page: isRef(params.page) ? params.page.value : params.page,
        limit: isRef(params.limit) ? params.limit.value : params.limit,
        sort: isRef(params.sort) ? params.sort.value : params.sort,
        ...params,
      };
    }

    return new URLSearchParams({
      ...{ page: "1", limit: "24" },
      ...queryParams,
    });
  });

  const { data, refresh } = await useAsyncData(options.key || endpoint, () => {
    return $fetch<any>(
      `${runtimeConfig.public.apiUrl}/${endpoint
        .replace(/^\//, "")
        .replace(/\/$/, "")}?${queryParams.value}`
    );
  });

  const meta = computed<ApiMeta | undefined>(() => {
    return data.value?.meta || undefined;
  });

  const results = computed<ResultsT>(() => {
    return data.value?.meta ? data.value.results : data.value;
  });

  return {
    meta,
    results,
    refresh,
  };
};
