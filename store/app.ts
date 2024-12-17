import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    headerHeight: 0,
    mainNavigationHeight: 0,
  }),
});
