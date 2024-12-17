import dynamicRoutes from "./helpers/dynamicRoutes";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiUrl: "https://api.jrvs.de/v2/kaninchen",
    },
  },
  build: {
    transpile: ["@jrvs-de/components"],
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@formkit/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    [
      "@funken-studio/sitemap-nuxt-3",
      {
        hostname: "https://www.kaninchen-kindermode.de",
        cacheTime: 1,
        routes: dynamicRoutes,
        defaults: {
          changefreq: "daily",
          priority: 1,
          lastmod: new Date().toISOString(),
        },
      },
    ],
  ],
  tailwindcss: {
    cssPath: "@/assets/styles/app.css",
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "de",
      },
      meta: [
        { charset: "utf-8" },
        { "http-equiv": "X-UA-Compatible", content: "IE=edge" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          name: "author",
          content: "Kaninchen Kindermode - Porawski & Gierke GbR",
        },
        {
          name: "publisher",
          content: "Kaninchen Kindermode - Porawski & Gierke GbR",
        },
        {
          name: "copyright",
          content: "Kaninchen Kindermode - Porawski & Gierke GbR",
        },
        {
          hid: "description",
          name: "description",
          content:
            'Handgefertigte Kindermode aus Berlin - Bei uns erhältst du individuelle, handgefertigte Kinderbekleidung aus "GOTS-Zertifizierten" Stoffen.',
        },
        {
          hid: "keywords",
          name: "keywords",
          content:
            "Handgefertigt, Kindermode, Kinderbekleidung, Berlin, GOTS, Bio, Individuell, Kaninchen, Hosen, Mützen, Strampler, Kleider, Jacken, Halstücher, Babykleidung, Kinderkleidung, Pankow, Handmade, Pumphose",
        },
        { "http-equiv": "content-language", content: "de" },
        { name: "robots", content: "index, follow" },
        {
          name: "DC.Creator",
          content: "Kaninchen Kindermode - Porawski & Gierke GbR",
        },
        {
          name: "DC.Publisher",
          content: "Kaninchen Kindermode - Porawski & Gierke GbR",
        },
        {
          name: "DC.Rights",
          content: "Kaninchen Kindermode - Porawski & Gierke GbR",
        },
        {
          hid: "dcdescription",
          name: "DC.Description",
          content:
            'Handgefertigte Kindermode aus Berlin - Bei uns erhältst du individuelle, handgefertigte Kinderbekleidung aus "GOTS-Zertifizierten" Stoffen.',
        },
        { name: "DC.Language", content: "de" },
      ],
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon-16x16.png",
          sizes: "16x16",
        },
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon-32x32.png",
          sizes: "32x32",
        },
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon-96x96.png",
          sizes: "96x96",
        },
        { rel: "apple-touch-icon", href: "/apple-touch-icon-120x120.png" },
        {
          rel: "apple-touch-icon",
          href: "/apple-touch-icon-180x180.png",
          sizes: "180x180",
        },
        {
          rel: "apple-touch-icon",
          href: "/apple-touch-icon-152x152.png",
          sizes: "152x152",
        },
        {
          rel: "apple-touch-icon",
          href: "/apple-touch-icon-157x157.png",
          sizes: "157x157",
        },
      ],
    },
  },
});
