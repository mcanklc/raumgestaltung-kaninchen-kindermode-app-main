// @ts-ignore
import VueMatomo from "vue-matomo";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueMatomo, {
    router: nuxtApp.$router,
    host: "https://usage.jrvs.de",
    siteId: 2,
    requireCookieConsent: true,
  });
});
