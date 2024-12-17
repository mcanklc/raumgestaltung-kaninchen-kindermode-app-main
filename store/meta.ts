import { defineStore } from "pinia";

const HOUR = 1000 * 60 * 60;

interface MetaItem {
  _id: string;
  title: string;
  description?: string;
  preview?: string;
}

export const useMetaStore = defineStore("meta", {
  state: () => ({
    categories: {
      items: [] as MetaItem[],
      total: 0,
      _fetchedAt: 0,
    },
    products: {
      groups: {
        items: [] as MetaItem[],
        total: 0,
        _fetchedAt: 0,
      },
    },
    fabrics: {
      categories: {
        items: [] as MetaItem[],
        total: 0,
        _fetchedAt: 0,
      },
      materials: {
        items: [] as MetaItem[],
        total: 0,
        _fetchedAt: 0,
      },
    },
  }),
  getters: {
    filterByCategories: (state) => ({
      id: "categories",
      name: "Kategorie",
      type: "multiple",
      options: state.categories.items.map((item) => ({
        label: item.title,
        value: item._id,
      })),
    }),
    filterBySeasons: () => ({
      id: "season",
      name: "Saison",
      type: "multiple",
      options: [
        {
          label: "Frühling/Sommer",
          value: "spring_summer",
        },
        {
          label: "Herbst/Winter",
          value: "autumn_winter",
        },
      ],
    }),
    filterByProductGroups: (state) => ({
      id: "productGroup",
      name: "Produktgruppe",
      type: "multiple",
      options: state.products.groups.items.map((item) => ({
        label: item.title,
        value: item._id,
      })),
    }),
    filterByFabricCategories: (state) => ({
      id: "categories",
      name: "Kategorie",
      type: "multiple",
      options: state.fabrics.categories.items.map((item) => ({
        label: item.title,
        value: item._id,
      })),
    }),
    filterByFabricMaterials: (state) => ({
      id: "material",
      name: "Material",
      type: "multiple",
      options: state.fabrics.materials.items.map((item) => ({
        label: item.title,
        value: item._id,
      })),
    }),
  },
  actions: {
    async fetchAll() {
      await Promise.all([
        this.fetchCategories(),
        this.fetchProductGroups(),
        this.fetchFabricCategories(),
        this.fetchFabricMaterials(),
      ]);
    },
    async fetchCategories() {
      if (
        !this.categories._fetchedAt ||
        this.categories._fetchedAt <= Date.now() - HOUR
      ) {
        const res = await $fetch<Record<string, any>>(
          `${useRuntimeConfig().public.apiUrl}/categories?limit=10000`
        );

        this.categories.items = res.results;
        this.categories.total = res.meta.totalResults;
        this.categories._fetchedAt = Date.now();
      }
    },
    async fetchProductGroups() {
      if (
        !this.products.groups._fetchedAt ||
        this.products.groups._fetchedAt <= Date.now() - HOUR
      ) {
        const res = await $fetch<Record<string, any>>(
          `${useRuntimeConfig().public.apiUrl}/product-groups?limit=10000`
        );

        this.products.groups.items = res.results;
        this.products.groups.total = res.meta.totalResults;
        this.products.groups._fetchedAt = Date.now();
      }
    },
    async fetchFabricCategories() {
      if (
        !this.fabrics.categories._fetchedAt ||
        this.fabrics.categories._fetchedAt <= Date.now() - HOUR
      ) {
        const res = await $fetch<Record<string, any>>(
          `${useRuntimeConfig().public.apiUrl}/fabric-categories?limit=10000`
        );

        this.fabrics.categories.items = res.results;
        this.fabrics.categories.total = res.meta.totalResults;
        this.fabrics.categories._fetchedAt = Date.now();
      }
    },
    async fetchFabricMaterials() {
      if (
        !this.fabrics.materials._fetchedAt ||
        this.fabrics.materials._fetchedAt <= Date.now() - HOUR
      ) {
        const res = await $fetch<Record<string, any>>(
          `${useRuntimeConfig().public.apiUrl}/fabric-materials?limit=10000`
        );

        this.fabrics.materials.items = res.results;
        this.fabrics.materials.total = res.meta.totalResults;
        this.fabrics.materials._fetchedAt = Date.now();
      }
    },
  },
});
