import type { WithContext, Thing } from "schema-dts";

type JsonLD = WithContext<Thing> | WithContext<Thing>[] | null;
type JsonLDFunc = () => JsonLD;

const isFunc = (json: JsonLD | JsonLDFunc): json is JsonLDFunc =>
  typeof json === "function";

export const useJsonld = (json: JsonLD | JsonLDFunc) => {
  if (!json) return;

  const jsonComputed = computed(() => (isFunc(json) ? json() : json));

  useHead(() => ({
    script: [
      {
        type: "application/ld+json",
        children: jsonComputed.value
          ? JSON.stringify(jsonComputed.value, null, "")
          : undefined,
      },
    ],
  }));
};
